import React from 'react';
import style from './[id].module.scss';

interface BlogProps {
  blog: {
    html: string;
  };
  status: string;
}
function Blog(props: BlogProps) {
  const { html } = props.blog;
  return (
    <div className={`${style.blog} shadow`}>
      <div
        className="document"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}

Blog.getInitialProps = async function (context: any): Promise<BlogProps> {
  // const id = context.query.id
  // const { status, data } = await getArticleDetail(id)
  // const blog = getFromLocal('123');
  return {
    blog: {
      html: '<h1>nginx</h1><h2>标题二</h2><h3>标题三</h3><p>这是正文</p>',
    },
    status: 'success',
  };
};

export default Blog;
