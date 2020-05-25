import React from 'react';
import style from './index.module.scss';
import { Avatar, Popover } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

/**
 * 页面头部
 */
function Header() {
  const content = (
    <ul className={style['header-actions']}>
      <li>操作一</li>
      <li>操作二</li>
      <li>
        <span>登录</span>
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
