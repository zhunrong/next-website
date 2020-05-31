import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import { Avatar, Popover, message as Message } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  HighlightOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import * as API from '@/api';

/**
 * 页面头部
 */
function Header() {
  const router = useRouter();
  const [user, setUser] = useState<UserEntity>(null);
  const isLogined = !!user?.id;
  const email = user?.email || '匆匆过客~';
  useEffect(() => {
    (async () => {
      const [err, data] = await API.getUserInfo();
      if (!err && data.status === 'success') {
        setUser(data.data);
      }
    })();
  }, []);
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
   * 去草稿箱
   */
  const linkToDraft = async () => {
    router.push('/user');
  };
  /**
   * 去登录
   */
  const linkToLogin = () => {
    router.push('/login');
  };
  /**
   * 注销登录
   */
  const logout = () => {
    (async () => {
      const [, data] = await API.logout();
      if (data.status === 'success') {
        setUser(null);
        router.push('/');
        Message.success('已注销');
      } else {
        Message.error(data.message);
      }
    })();
  };
  const content = (
    <ul className={style['header-actions']}>
      {isLogined ? (
        <>
          <li onClick={linkToEditor}>
            <span>写文章</span>
            <HighlightOutlined />
          </li>
          <li onClick={linkToDraft}>
            <span>草稿箱</span>
            <FileDoneOutlined />
          </li>
          <li onClick={logout}>
            <span>注销</span>
            <LogoutOutlined />
          </li>
        </>
      ) : (
        <>
          <li onClick={linkToLogin}>
            <span>去登录</span>
            <LoginOutlined />
          </li>
        </>
      )}
    </ul>
  );
  return (
    <div className={`${style['header']} shadow`}>
      <Popover
        overlayClassName={style['header-avatar-popover']}
        title={email}
        placement="bottomRight"
        content={content}
      >
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
