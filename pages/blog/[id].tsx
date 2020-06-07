import React from 'react';
import style from './[id].module.scss';
import { NextPage, GetServerSideProps } from 'next';
import * as API from '@/api';
import Header from '@/modules/header';

interface BlogProps {
  blog: BlogEntity;
  status: string;
}

const Blog: NextPage<BlogProps> = function (props) {
  const { html } = props.blog;
  return (
    <div className={`${style.blog}`}>
      <Header />
      <div className="document shadow bf-container">
        <div
          className="public-DraftEditor-content"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<BlogProps> = async (
  ctx
) => {
  const id = ctx.query.id as string;
  const [, res] = await API.getArticleDetail(id);
  return {
    props: {
      status: res.status,
      blog: res.data,
    },
  };
};

export default Blog;
