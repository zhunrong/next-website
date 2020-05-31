import React from 'react';
import { useState, Props } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import style from './index.module.scss';
import { SaveOutlined, LoadingOutlined } from '@ant-design/icons';
import { isEditorState } from '@/utils/is';
import { ExtendControlType, EditorState } from 'braft-editor';
import { RawDraftContentState, RawDraftContentBlock } from 'draft-js';
import * as API from '@/api/article.api';

const BraftEditor = dynamic(() => import('@/components/braftEditor'), {
  ssr: false,
});

interface EditorViewProps {
  initRaw: string;
}

/**
 * 编辑页面
 */
const EditorView: NextPage<EditorViewProps> = (props) => {
  const { initRaw } = props;
  const [editorState, setEditorState] = useState(null);
  const [syncState, setSyncState] = useState(false);
  const router = useRouter();
  const id = router.query.id as string;
  /**
   * 同步到远程
   */
  const synchronize = async () => {
    setSyncState(true);
    if (isEditorState(editorState)) {
      const raw = editorState.toRAW(true) as RawDraftContentState;
      const html = editorState.toHTML();
      const [, data] = await API.updateDraft({
        id,
        title: raw.blocks[0]?.text || '',
        raw: JSON.stringify(raw),
        html,
      });
      if (data?.status === 'success') {
        console.log('保存成功');
      }
    }
    setSyncState(false);
  };
  /**
   * 自定义的控制组件
   */
  const extendControls: ExtendControlType[] = [
    {
      text: (
        <EditorBtn loading={syncState} onClick={synchronize}>
          <SaveOutlined />
        </EditorBtn>
      ),
      className: 'editor-btn',
      title: '同步',
      key: 'save-button',
      type: 'button',
    },
  ];
  return (
    <div className={`${style.editor}`}>
      <div className="editor-directory shadow">
        <Directory editorState={editorState} />
      </div>
      <div className="editor-container shadow">
        <BraftEditor
          onStateUpdate={setEditorState}
          initRaw={initRaw}
          extendControls={extendControls}
        />
      </div>
    </div>
  );
};

/**
 * 服务端获取数据
 * @param ctx
 */
export const getServerSideProps: GetServerSideProps<EditorViewProps> = async (
  ctx
) => {
  const id = ctx.query.id as string;
  const cookie = ctx.req.headers.cookie;
  const [, data] = await API.getDraft(id, cookie);
  let initRaw = '';
  if (data.status === 'success') {
    initRaw = data.data.raw;
  }
  return {
    props: {
      initRaw,
    },
  };
};

interface EditorBtnProps extends Props<HTMLDivElement> {
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
/**
 * 自定义编辑器按钮
 * @param props
 */
function EditorBtn(props: EditorBtnProps) {
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
}

interface DirectoryProps {
  editorState: EditorState | null;
}

/**
 * 文档目录
 */
function Directory(props: DirectoryProps) {
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
}

export default EditorView;
