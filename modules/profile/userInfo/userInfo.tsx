import React, { FunctionComponent } from 'react';
import { Form, Input, Button } from 'antd';
import { Rule } from 'antd/lib/form';
import style from './userInfo.module.scss';
import { useUser } from '@/services/hooks/hooks';
import AvatarSetting from './avatar/avatar';

const UserInfo: FunctionComponent = () => {
  const user = useUser();
  const baseInfo = {
    email: user.email,
    nickname: user.nickname,
  };
  const securityInfo = {
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  };
  /**
   * 更新基本信息
   * @param values
   */
  const updateBaseInfo = (values: typeof baseInfo) => {
    console.log(values);
  };
  /**
   * 更新密码
   * @param values
   */
  const updatePassword = (values: typeof securityInfo) => {
    console.log(values);
  };
  const rules: Rule[] = [
    {
      validator(rule, value) {
        const field = (rule as any).field as string;
        switch (field) {
          case 'oldPassword':
            if (value === '') return Promise.reject('请输入原密码');
            break;
          case 'newPassword':
            if (!/^[_@$a-zA-Z0-9]{8,}$/.test(value))
              return Promise.reject(
                '密码长度不能少于8个字符，合法字符包括【大小写字母、数字、_@$】'
              );
            break;
          case 'repeatPassword':
            if (securityInfo.repeatPassword !== securityInfo.newPassword) {
              return Promise.reject('两次输入不一致');
            }
            break;
        }
        return Promise.resolve();
      },
    },
  ];
  const handlePasswordInput = (values: typeof securityInfo) => {
    Object.assign(securityInfo, values);
  };
  return (
    <div className={style['user']}>
      <div className="user-form">
        <div className="user-form-title">个人信息</div>
        <div className="user-info">
          <Form
            layout="vertical"
            initialValues={baseInfo}
            onFinish={updateBaseInfo}
          >
            <Form.Item label="邮箱" name="email">
              <Input readOnly></Input>
            </Form.Item>
            <Form.Item
              label="昵称"
              name="nickname"
              rules={[{ required: true, message: '昵称不能为空' }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新信息
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="user-avatar">
          <div className="user-avatar-label">头像</div>
          <AvatarSetting />
        </div>
      </div>
      <div className="user-form">
        <div className="user-form-title">安全设置</div>
        <div className="user-security">
          <Form
            layout="vertical"
            initialValues={securityInfo}
            onFinish={updatePassword}
            onValuesChange={handlePasswordInput}
          >
            <Form.Item label="原密码" name="oldPassword" rules={rules}>
              <Input.Password allowClear visibilityToggle></Input.Password>
            </Form.Item>
            <Form.Item label="新密码" name="newPassword" rules={rules}>
              <Input.Password allowClear visibilityToggle></Input.Password>
            </Form.Item>
            <Form.Item label="确认新密码" name="repeatPassword" rules={rules}>
              <Input.Password allowClear visibilityToggle></Input.Password>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新密码
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
