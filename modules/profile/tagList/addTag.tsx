import React, { FunctionComponent, useState } from 'react';
import { Button, Form, Input, Space, message as Message } from 'antd';
import * as API from '@/api';

export interface AddTagProps {
  onCreated?: () => void;
}

export const AddTag: FunctionComponent<AddTagProps> = (props) => {
  const { onCreated } = props;
  const [show, setShow] = useState(false);
  const formModel = {
    name: '',
  };
  const handleFinish = async (values: typeof formModel) => {
    const [, res] = await API.createTag(values.name);
    if (res.status === 'success') {
      Message.success('创建成功');
      setShow(false);
      onCreated && onCreated();
    } else {
      Message.error(res.message);
    }
  };
  return (
    <div className="add-tag">
      {show ? (
        <Form initialValues={formModel} onFinish={handleFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: '标签名不能为空',
              },
            ]}
          >
            <Input
              style={{ width: '220px' }}
              autoFocus
              placeholder="请输入标签名"
            ></Input>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => setShow(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        <Button type="primary" onClick={() => setShow(true)}>
          新增标签
        </Button>
      )}
    </div>
  );
};

export default AddTag;
