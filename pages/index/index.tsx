import Link from 'next/link'
import { useEffect, useRef } from 'react'
import style from './index.module.scss'
import { getAllArticles } from '../../api/article.api'
import { publicPath } from '../../utils'
import { Carousel } from 'antd'
// import 'antd/dist/antd.css'

// const banner1 = require('../../images/banner_1.jpg').default
// import banner1 from '../../images/banner_1.jpg'
// console.log(banner1)

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
      <BlogBanner />
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
    status:0
  }
}

function BlogBanner() {
  return (
    <div className={style['blog-banner']}>
      <Carousel autoplay={false}>
        <div className="banner-item">
          <ReactiveImage src={publicPath('/images/banner_1.jpg')} />
        </div>
        <div className="banner-item">
          <ReactiveImage src={publicPath('/images/banner_2.jpg')} />
        </div>
        <div className="banner-item">
          <ReactiveImage src={publicPath('/images/banner_3.jpg')} />
        </div>
        <div className="banner-item">
          <ReactiveImage src={publicPath('/images/banner_4.jpg')} />
        </div>
      </Carousel>
    </div>
  )
}

function ReactiveImage(props: { src: string }) {
  const { src } = props
  const ref = useRef<HTMLImageElement>()
  useEffect(() => {
    // console.log(ref.current)
    const el = ref.current
    const onload = () => {
      const { naturalHeight, naturalWidth } = el
      if (naturalHeight === 0) return
      const { offsetWidth, offsetHeight } = el.parentElement
      el.style.transform = `translate(-50%,-50%) scale(${Math.max(offsetWidth / naturalWidth, offsetHeight / naturalHeight)})`
      el.style.visibility = 'visible'
    }
    onload()
    el.addEventListener('load', onload)
    return () => {
      el.removeEventListener('load', onload)
    }
  })
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <img ref={ref} src={src} style={{ display: 'block', position: 'absolute', visibility: 'hidden', left: '50%', top: '50%' }} />
    </div>
  )
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
      <Link href="/blog/[id]" as={`/blog/${id}`} prefetch={false}>
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