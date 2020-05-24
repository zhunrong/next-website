import React from 'react';
import BraftEditor, {
  EditorState,
  BuiltInControlType,
  ExtendControlType,
} from 'braft-editor';
import { useState, useEffect } from 'react';

interface EditorProps {
  onStateUpdate?: (editorState: EditorState) => void;
  initRaw?: string;
  extendControls?: ExtendControlType[];
}

const excludeControls: BuiltInControlType[] = ['fullscreen'];

function Editor(props: EditorProps) {
  const { onStateUpdate, initRaw, extendControls } = props;
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(initRaw)
  );
  useEffect(() => {
    if (onStateUpdate) {
      onStateUpdate(editorState);
    }
  }, [editorState]);
  return (
    <BraftEditor
      className="document"
      value={editorState}
      onChange={setEditorState}
      excludeControls={excludeControls}
      extendControls={extendControls}
    />
  );
}

export default Editor;
