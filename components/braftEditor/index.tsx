import React, { useState, useEffect, FunctionComponent, Props } from 'react';
import BraftEditor, {
  EditorState,
  BuiltInControlType,
  ExtendControlType,
} from 'braft-editor';
import style from './index.module.scss';
import { SaveOutlined, LoadingOutlined } from '@ant-design/icons';
import { isEditorState } from '@/utils/is';
import { RawDraftContentState, RawDraftContentBlock } from 'draft-js';

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
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(initRaw)
  );
  useEffect(() => {
    if (onStateUpdate) {
      onStateUpdate(editorState);
    }
  }, [editorState]);
  /**
   * 自定义的控制组件
   */
  // const extendControls: ExtendControlType[] = [
  //   {
  //     text: (
  //       <EditorBtn>
  //         <SaveOutlined />
  //       </EditorBtn>
  //     ),
  //     className: 'editor-btn',
  //     title: '同步',
  //     key: 'save-button',
  //     type: 'button',
  //   },
  // ];
  return (
    <div className={`${style.editor}`}>
      {/* <div className="editor-directory shadow">
        <Directory editorState={editorState} />
      </div> */}
      <div className="editor-container">
        <BraftEditor
          className="document"
          value={editorState}
          onChange={setEditorState}
          excludeControls={excludeControls}
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
