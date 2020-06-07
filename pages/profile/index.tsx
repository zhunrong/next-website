import React, { useState } from 'react';
import { NextPage } from 'next';
import style from './index.module.scss';
import Header from '@/modules/header';
import DraftList from '@/modules/profile/draftList';
import BlogList from '@/modules/profile/blogList';
import { Tabs } from 'antd';

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
