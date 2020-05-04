import ReactMarkdown from 'react-markdown'
import Head from 'next/head'
import { getArticleDetail } from '../../api/article.api'
import style from './style.less'

interface BlogProps {
  blog: {
    markdown: string
  }
  status: string
}
function Blog(props: BlogProps) {
  const { markdown } = props.blog
  return (
    <div className={style.blog}>
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head> */}
      <ReactMarkdown source={markdown}></ReactMarkdown>
    </div>
  )
}

Blog.getInitialProps = async function (context: any) {
  const id = context.query.id
  const { status, data } = await getArticleDetail(id)
  return {
    blog: data,
    status
  }
}

export default Blog