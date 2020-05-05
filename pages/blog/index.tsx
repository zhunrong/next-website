import style from './index.less'
import { getAllArticles } from '../../api/article.api'
import Link from 'next/link'

interface Props {
  status: string
  data: any[]
}
/**
 * 博客列表页面
 * @param props 
 */
function BlogList(props: Props) {
  const { data } = props
  return (
    <div className={style['blog-list']}>
      <ol>
        {
          data.map(item => {
            return <BlogItem {...item} key={item.id} />
          })
        }
      </ol>
    </div>
  )
}

BlogList.getInitialProps = async function () {
  const { data, status } = await getAllArticles(10, 1)
  return {
    data,
    status
  }
}

interface BlogItemProps {
  id: string
  title: string
  updateTime: string
}
function BlogItem(props: BlogItemProps) {
  const { title, id, updateTime } = props
  return (
    <li className={`${style['blog-item']} shadow`}>
      <Link href={`blog/${id}`}>
        <a>
          <h2>{title}</h2>
          <div>
            <span className="update-time">{updateTime}</span>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default BlogList