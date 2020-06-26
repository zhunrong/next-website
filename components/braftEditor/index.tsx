import React, { useState, useMemo, FunctionComponent, Props } from 'react';
import BraftEditor, {
  EditorState,
  BuiltInControlType,
  ExtendControlType,
  MediaType,
} from 'braft-editor';
import style from './index.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { isEditorState } from '@/utils/is';
import { RawDraftContentState, RawDraftContentBlock } from 'draft-js';
import './config';
import COS from 'cos-js-sdk-v5';
import * as API from '@/api';
import { useUser } from '@/services/hooks/hooks';

interface EditorProps {
  onStateUpdate?: (editorState: EditorState) => void;
  initRaw?: string;
  extendControls?: ExtendControlType[];
}

const excludeControls: BuiltInControlType[] = ['fullscreen'];

/**
 * 编辑器封装
 * @param props
 */
const Editor: FunctionComponent<EditorProps> = (props) => {
  const { onStateUpdate, initRaw } = props;
  const [editorState] = useState(BraftEditor.createEditorState(initRaw));
  const user = useUser();
  const cos: any = useMemo(() => {
    return new COS({
      async getAuthorization(options: any, callback: any) {
        const [, res] = await API.getUploadToken('user');
        if (res.status === 'success') {
          const { credentials, startTime, expiredTime } = res.data;
          callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            XCosSecurityToken: credentials.sessionToken,
            StartTime: startTime,
            ExpiredTime: expiredTime,
          });
        }
      },
    });
  }, []);
  /**
   * 处理状态更新
   * @param editorState
   */
  const handleEditorStateChange = (editorState: EditorState) => {
    if (onStateUpdate) onStateUpdate(editorState);
  };
  /**
   * 媒体相关配置
   */
  const mediaConfig: MediaType = {
    accepts: {
      image: 'image/*',
      video: false,
      audio: false,
    },
    externals: {
      video: false,
      audio: false,
      embed: false,
    },
    uploadFn(params) {
      const { file, progress, error, success } = params;
      const key = `/${user.email}/media/${Date.now()}_${file.name}`;
      cos.putObject(
        {
          Bucket: 'user-1253381776',
          Region: 'ap-guangzhou',
          Key: key,
          Body: file,
          onProgress(data: any) {
            progress(data.percent * 100);
          },
        },
        (err: any, data: any) => {
          if (err) {
            error({
              msg: '上传失败',
            });
            console.error(err);
          } else {
            success({
              url: `http://${data.Location}`,
              meta: {
                title: file.name,
                id: key,
                alt: 'image',
                loop: false,
                autoPlay: false,
                poster: null,
                controls: true,
              },
            });
          }
        }
      );
    },
  };
  return (
    <div className={`${style.editor}`}>
      {/* <div className="editor-directory shadow">
        <Directory editorState={editorState} />
      </div> */}
      <div className="editor-container">
        <BraftEditor
          className="document"
          defaultValue={editorState}
          onChange={handleEditorStateChange}
          excludeControls={excludeControls}
          media={mediaConfig}
        />
      </div>
    </div>
  );
};

interface EditorBtnProps extends Props<HTMLDivElement> {
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
/**
 * 自定义编辑器按钮
 * @param props
 */
const EditorBtn: FunctionComponent<EditorBtnProps> = (props) => {
  const { loading, children, onClick } = props;
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!loading && onClick) {
      onClick(e);
    }
  };
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleClick}
    >
      {loading ? <LoadingOutlined /> : children}
    </div>
  );
};

interface DirectoryProps {
  editorState: EditorState | null;
}
/**
 * 文档目录
 */
const Directory: FunctionComponent<DirectoryProps> = (props) => {
  const { editorState } = props;
  let blocks: RawDraftContentBlock[] = [];
  let title = '';
  if (isEditorState(editorState)) {
    const raw = editorState.toRAW(true) as RawDraftContentState;
    blocks = raw.blocks.filter((item) => item.type.startsWith('header'));
    if (raw.blocks.length) {
      title = raw.blocks[0].text;
    }
  }
  return (
    <div className={`${style['directory']}`}>
      <div className="doc-title text-ellipsis" title={title}>
        {title}
      </div>
      <div className="directory-title">--目录（Directory）--</div>
      <div className="directory-content">
        <ul>
          {blocks.map((item) => {
            return (
              <li key={item.key}>
                <div
                  className={`${item.type} doc-header text-ellipsis`}
                  title={item.text}
                >
                  {item.text}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Editor;
