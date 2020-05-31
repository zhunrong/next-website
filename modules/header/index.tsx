import React from 'react';
import style from './index.module.scss';
import { Avatar, Popover } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  HighlightOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import * as API from '@/api/article.api';

/**
 * 页面头部
 */
function Header() {
  const router = useRouter();
  /**
   * 去写文章
   */
  const linkToEditor = async () => {
    const [, data] = await API.createDraft();
    if (data.status === 'success') {
      const id = data.data.id;
      router.push('/editor/[id]', `/editor/${id}`);
    }
  };
  /**
   * 去登录
   */
  const linkToLogin = () => {
    router.push('/login');
  };
  const content = (
    <ul className={style['header-actions']}>
      <li onClick={linkToEditor}>
        <span>写文章</span>
        <HighlightOutlined />
      </li>
      <li onClick={linkToLogin}>
        <span>去登录</span>
        <LoginOutlined />
      </li>
    </ul>
  );
  return (
    <div className={`${style['header']} shadow`}>
      <Popover title="用户" placement="bottomRight" content={content}>
        <Avatar
          className="header-avatar"
          size={32}
          icon={<UserOutlined />}
          alt="User"
        />
      </Popover>
    </div>
  );
}

export default Header;
