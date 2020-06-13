import React, { useState } from 'react';
import { NextPage } from 'next';
import style from './index.module.scss';
import Header from '@/modules/header';
import DraftList from '@/modules/profile/draftList';
import BlogList from '@/modules/profile/blogList';
import { Tabs } from 'antd';
import Head from 'next/head';

const UserView: NextPage = () => {
  const [active, setActive] = useState('blog');
  /**
   * tab栏切换
   * @param key
   */
  const handleTabChange = (key: string) => {
    setActive(key);
  };
  return (
    <div className={style['user']}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          key="viewport"
        />
        <title>个人中心</title>
      </Head>
      <Header></Header>
      <div className="user-main shadow">
        <Tabs activeKey={active} onChange={handleTabChange}>
          <Tabs.TabPane tab="我的博客" key="blog">
            {active === 'blog' && <BlogList></BlogList>}
          </Tabs.TabPane>
          <Tabs.TabPane tab="我的草稿" key="draft">
            {active === 'draft' && <DraftList></DraftList>}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserView;
