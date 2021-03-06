import React, { useEffect, useState } from 'react';
import style from './[id].module.scss';
import { NextPage, GetServerSideProps } from 'next';
import * as API from '@/api';
import Header from '@/modules/header';
import Prism from 'prismjs';
import PageLayout from '@/components/pageLayout/pageLayout';
import Preview from '@/modules/blog/preview';
import { useRouter } from 'next/router';
import { getUserState } from '@/services/common/serverSide';
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
  const { blog, status } = props;
  const [previewImage, setPreviewImage] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (status === 'success') {
      Prism.highlightAll();
    } else {
      router.replace('/');
    }
  }, []);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target instanceof HTMLImageElement) {
      setPreviewImage(target.src);
    }
  };
  if (status !== 'success') return null;
  const { html, title } = blog;
  return (
    <PageLayout className={`${style.blog}`} docTitle={title}>
      <Header />
      <div className="document shadow bf-container">
        <div
          className="public-DraftEditor-content"
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
      <Preview src={previewImage} onClosed={() => setPreviewImage('')} />
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<BlogProps> = async (
  ctx
) => {
  const id = ctx.query.id as string;
  const [, res] = await API.getArticleDetail(id);
  let blog: BlogEntity = null;
  const status = res.status;
  if (status === 'success') {
    blog = res.data;
  }
  const state = await getUserState(ctx);
  return {
    props: {
      status,
      blog,
      initialState: state,
    },
  };
};

export default Blog;
