import style from './style.less'
import { getAllArticles } from '../../api/article.api'

interface BlogProps {
  status: string
  data: any[]
}
function Blog(props: BlogProps) {
  const { data } = props
  return (
    <div className={style.blog}>
      {
        data.map(item => {
          return <div key={item.id}>{item.title}</div>
        })
      }
    </div>
  )
}

Blog.getInitialProps = async function () {
  const { data, status } = await getAllArticles(10, 1)
  return {
    data,
    status
  }
}

export default Blog