import React, { FunctionComponent, useState } from 'react';
import style from './profile.module.scss';
import Header from '@/modules/header';
import PageLayout from '@/components/pageLayout/pageLayout';
import { Tabs } from 'antd';
import UserInfo from './userInfo/userInfo';
import BlogList from './blogList';
import DraftList from './draftList';

const Profile: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState('setting');
  /**
   * 面板切换
   * @param key
   */
  const handleTabChange = (key: string) => setActiveTab(key);
  return (
    <PageLayout className={`${style['profile']} shadow`} docTitle="个人中心">
      <Header></Header>
      <div className="profile-main">
        <Tabs
          tabPosition="left"
          activeKey={activeTab}
          onChange={handleTabChange}
        >
          <Tabs.TabPane tab="个人设置" key="setting">
            <UserInfo />
          </Tabs.TabPane>
          <Tabs.TabPane tab="博客列表" key="blog">
            {activeTab === 'blog' && <BlogList />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="草稿列表" key="draft">
            {activeTab === 'draft' && <DraftList />}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Profile;
