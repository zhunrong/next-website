import React, { useEffect } from 'react';
import style from './[id].module.scss';
import { NextPage, GetServerSideProps } from 'next';
import * as API from '@/api';
import Header from '@/modules/header';
import Head from 'next/head';
import Prism from 'prismjs';
/**
 * prismjs语言列表
 */
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-glsl';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-yaml';
/**
 * prismjs插件
 */
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

/**
 * 开启手动调用
 */
(Prism as any).manual = true;
/**
 * 修复代码换行问题
 */
Prism.hooks.add('before-highlight', function (env) {
  env.element.innerHTML = env.element.innerHTML.replace(/<br\s*\/?>/g, '\n');
  env.code = env.element.textContent.replace(/^(?:\r?\n|\r)/, '');
});

interface BlogProps {
  blog: BlogEntity;
  status: string;
}

const Blog: NextPage<BlogProps> = function (props) {
  const { html, title } = props.blog;
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className={`${style.blog}`}>
      <Head>
        <title>{title}</title>
      </Head>
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
