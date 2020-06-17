import React, { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import style from './index.module.scss';
import Header from '@/modules/header';
import DraftList from '@/modules/profile/draftList';
import BlogList from '@/modules/profile/blogList';
import { Tabs } from 'antd';
import Head from 'next/head';
import { getUserState } from '@/services/common/serverSide';
import { useUserAndRedirect } from '@/services/hooks/hooks';

const UserView: NextPage = () => {
  const user = useUserAndRedirect();
  const [active, setActive] = useState('blog');
  if (!user) return null;
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const state = await getUserState(ctx);
  return {
    props: {
      initialState: state,
    },
  };
};

export default UserView;
