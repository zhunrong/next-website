import React, { useEffect } from 'react';
import style from './index.module.scss';
import { Form, Input, Button, Checkbox, message as Message } from 'antd';
import md5 from 'blueimp-md5';
import * as API from '../../api/user.api';
import * as loginService from '../../services/login';
import { useRouter } from 'next/router';
import PageLayout from '@/components/pageLayout/pageLayout';

interface FormModel {
  email: string;
  password: string;
  remember: string;
}

function LoginView() {
  const [form] = Form.useForm();
  const router = useRouter();
  const handleFinish = async ({ email, password, remember }: FormModel) => {
    if (remember) {
      loginService.saveLoginInfo(email, password, true);
    } else {
      loginService.saveLoginInfo('', '', false);
    }
    const [, data] = await API.login(email, md5(password));
    if (data.status === 'success') {
      Message.success('登录成功');
      router.push('/');
    } else {
      Message.error(data.message);
    }
  };
  useEffect(() => {
    const model = loginService.getLoginInfo();
    if (model.remember === true) {
      form.setFieldsValue(model);
    } else if (model.remember === false) {
      form.setFieldsValue({ remember: false });
    }
  }, []);
  return (
    <PageLayout className={style['login']}>
      <div className="login-form shadow">
        <div className="login-title">Login</div>
        <Form
          form={form}
          name="login"
          initialValues={{ email: '', password: '', remember: false }}
          onFinish={handleFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '邮箱必填' }]}
          >
            <Input placeholder="邮箱" allowClear></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码必填' }]}
          >
            <Input placeholder="密码" type="password" allowClear></Input>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  );
}

export default LoginView;
