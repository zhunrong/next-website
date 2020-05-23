import BraftEditor, { EditorState, BuiltInControlType, ExtendControlType } from 'braft-editor'
import { useState, useEffect } from 'react'

interface EditorProps {
  onUpdateState?: (editorState: EditorState) => void
  initRaw?: string
  extendControls?: ExtendControlType[]
}

const excludeControls: BuiltInControlType[] = ['fullscreen'];

function Editor(props: EditorProps) {
  const { onUpdateState, initRaw, extendControls } = props
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(initRaw))
  useEffect(() => {
    if (onUpdateState) {
      onUpdateState(editorState)
    }
  })
  return <BraftEditor className="document" value={editorState} onChange={setEditorState} excludeControls={excludeControls} extendControls={extendControls} />
}

export default Editor