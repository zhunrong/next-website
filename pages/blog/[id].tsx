import React from 'react';
import ReactMarkdown from 'react-markdown';
// import { getArticleDetail } from '../../api/article.api';
import style from './[id].module.scss';

interface BlogProps {
  blog: {
    markdown: string;
  };
  status: string;
}
function Blog(props: BlogProps) {
  const { markdown } = props.blog;
  return (
    <div className={`${style.blog} shadow`}>
      <ReactMarkdown
        className="markdown-style"
        source={markdown}
      ></ReactMarkdown>
    </div>
  );
}

Blog.getInitialProps = async function (context: any) {
  // const id = context.query.id
  // const { status, data } = await getArticleDetail(id)
  const data = {
    markdown: '# 123',
  };
  return {
    blog: data,
    status: 0,
  };
};

export default Blog;
