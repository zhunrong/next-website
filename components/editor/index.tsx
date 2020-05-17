import { useState, useRef, Dispatch, SetStateAction } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { Button } from 'antd'
import { BoldOutlined, ItalicOutlined } from '@ant-design/icons'
import style from './index.module.scss'

function DraftEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const ref = useRef<Editor>()
  const handleChange = (state: EditorState) => {
    setEditorState(state)
  }
  /**
   * 点击编辑器容器获得焦点
   */
  const handleClick = () => {
    ref.current.focus()
  }
  return (
    <div className={style['draft-editor']}>
      <EditorTools editorState={editorState} setEditorState={setEditorState} />
      <div className="draft-editor-container" onClick={handleClick}>
        <Editor ref={ref} editorState={editorState} onChange={handleChange} />
      </div>
    </div>
  )
}

interface EditorToolsProps {
  editorState: EditorState
  setEditorState: Dispatch<SetStateAction<EditorState>>
}
function EditorTools(props: EditorToolsProps) {
  const { editorState, setEditorState } = props
  const setBlod = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }
  return (
    <div className="draft-editor-tools">
      <Button onClick={setBlod} icon={<BoldOutlined />}></Button>
      <Button icon={<ItalicOutlined />}></Button>
    </div>
  )
}

export default DraftEditor