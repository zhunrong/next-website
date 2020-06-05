import React from 'react';
import { NextPage } from 'next';
import style from './index.module.scss';
import Header from '@/modules/header';
import DraftList from '@/modules/profile/draftList';
import BlogList from '@/modules/profile/blogList';
import { Tabs } from 'antd';

const UserView: NextPage = () => {
  return (
    <div className={style['user']}>
      <Header></Header>
      <div className="user-main shadow">
        <Tabs>
          <Tabs.TabPane tab="我的草稿" key="draft">
            <DraftList></DraftList>
          </Tabs.TabPane>
          <Tabs.TabPane tab="我的博客" key="blog">
            <BlogList></BlogList>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserView;
