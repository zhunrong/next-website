import React from "react";
import dynamic from "next/dynamic";
import style from "./index.module.scss";
import { useState, Props } from "react";
import { SaveOutlined, LoadingOutlined } from "@ant-design/icons";
import { isEditorState } from "../../utils/is";
import { ExtendControlType } from "braft-editor";

const BraftEditor = dynamic(() => import("../../components/braftEditor"), {
  ssr: false,
});

const initRaw =
  '{"blocks":[{"key":"ak1dq","text":"h1","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

function EditorPage() {
  const [editorState, setEditorState] = useState(null);
  const [syncState, setSyncState] = useState(false);
  /**
   * 同步到远程
   */
  const synchronize = () => {
    setSyncState(true);
    if (isEditorState(editorState)) {
      console.log(editorState.toRAW());
      console.log(editorState.toHTML());
    }
    setTimeout(() => {
      setSyncState(false);
    }, 1000);
  };
  const extendControls: ExtendControlType[] = [
    {
      text: (
        <EditorBtn loading={syncState} onClick={synchronize}>
          <SaveOutlined />
        </EditorBtn>
      ),
      className: "editor-btn",
      title: "同步",
      key: "save-button",
      type: "button",
    },
  ];
  return (
    <div className={`${style.editor} shadow`}>
      <div className="editor-container">
        <BraftEditor
          onUpdateState={setEditorState}
          initRaw={initRaw}
          extendControls={extendControls}
        />
      </div>
    </div>
  );
}

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
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={handleClick}
    >
      {loading ? <LoadingOutlined /> : children}
    </div>
  );
}

export default EditorPage;
