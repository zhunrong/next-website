import React from 'react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import style from './index.module.scss';
import { publicPath } from '../../utils';
import { Carousel, Empty } from 'antd';
import Header from '@/modules/header';
import * as API from '@/api';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface Props {
  status: 'success' | 'error';
  blogList: BlogEntity[];
}
/**
 * 博客列表页面
 * @param props
 */
function BlogList(props: Props) {
  const { blogList } = props;
  return (
    <div className={style['blog-list']}>
      <Head>
        <title>zhunrong&apos;s site</title>
      </Head>
      <Header />
      <BlogBanner />
      {blogList.length ? (
        <ol>
          {blogList.map((item) => {
            return <BlogItem {...item} key={item.id} />;
          })}
        </ol>
      ) : (
        <div className="blog-list-none shadow">
          <Empty description="什么都没有~" />
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [, res] = await API.getBlogList();
  const blogList = res.data;
  return {
    props: {
      blogList: blogList,
      status: res.status,
    },
  };
};

function BlogBanner() {
  return (
    <div className={style['blog-banner']}>
      <Carousel autoplay>
        <div className="banner-item">
          <ReactiveImage src="http://zhunrong.gitee.io/static/next-website/banner_1.jpg" />
        </div>
        <div className="banner-item">
          <ReactiveImage src="http://zhunrong.gitee.io/static/next-website/banner_2.jpg" />
        </div>
        <div className="banner-item">
          <ReactiveImage src="http://zhunrong.gitee.io/static/next-website/banner_3.jpg" />
        </div>
        <div className="banner-item">
          <ReactiveImage src="http://zhunrong.gitee.io/static/next-website/banner_4.jpg" />
        </div>
      </Carousel>
    </div>
  );
}

function ReactiveImage(props: { src: string }) {
  const { src } = props;
  const ref = useRef<HTMLImageElement>();
  useEffect(() => {
    const el = ref.current;
    const onload = () => {
      const { naturalHeight, naturalWidth } = el;
      if (naturalHeight === 0) return;
      const { offsetWidth, offsetHeight } = el.parentElement;
      el.style.transform = `translate(-50%,-50%) scale(${Math.max(
        offsetWidth / naturalWidth,
        offsetHeight / naturalHeight
      )})`;
      el.style.visibility = 'visible';
    };
    onload();
    el.addEventListener('load', onload);
    return () => {
      el.removeEventListener('load', onload);
    };
  });
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <img
        ref={ref}
        src={src}
        style={{
          display: 'block',
          position: 'absolute',
          visibility: 'hidden',
          left: '50%',
          top: '50%',
        }}
      />
    </div>
  );
}

interface BlogItemProps {
  id: string;
  title: string;
  updateTime: string;
}
function BlogItem(props: BlogItemProps) {
  const { title, id, updateTime } = props;
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
  );
}

export default BlogList;
