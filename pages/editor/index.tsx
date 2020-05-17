import dynamic from 'next/dynamic'
import style from './index.module.scss'
const DraftEditor = dynamic(() => import('../../components/editor'), { ssr: false })

function EditorPage() {
  return (
    <div className={`${style.editor} shadow`}>
      <DraftEditor />
    </div>
  )
}

export default EditorPage