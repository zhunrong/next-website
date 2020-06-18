import React, { FunctionComponent } from 'react';
import { Form, Input, Button } from 'antd';
import style from './userInfo.module.scss';

const UserInfo: FunctionComponent = () => {
  return (
    <div className={style['user']}>
      <div className="user-title">个人信息</div>
      <div className="user-info">
        <Form layout="vertical">
          <Form.Item label="用户名">
            <Input></Input>
          </Form.Item>
          <Form.Item label="邮箱">
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary">更新信息</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserInfo;
