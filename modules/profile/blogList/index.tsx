import React, { FunctionComponent, useEffect, useState } from 'react';
import { Space, Table, Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
import * as API from '@/api';
import Link from 'next/link';

const UserBlogs: FunctionComponent = () => {
  const [blogs, setBlogs] = useState<BlogEntity[]>([]);
  useEffect(() => {
    getBlogs();
  }, []);
  /**
   * 获取blog列表
   */
  const getBlogs = async () => {
    const [, data] = await API.getUserBlogList();
    if (data.status === 'success') {
      setBlogs(data.data);
    }
  };
  /**
   * 删除blog
   * @param id
   */
  const deleteBlog = async (id: string) => {
    // const [, data] = await API.deleteBlog(id);
    // if (data.status === 'success') {
    //   getBlogs();
    // }
  };
  const columns: ColumnType<BlogEntity>[] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '最后更新时间',
      dataIndex: 'updateAt',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: function Action(text, record) {
        return (
          <Space size="middle">
            <Link href="/editor/[id]" as={`/editor/${record.id}`}>
              <a>编辑</a>
            </Link>
            <Button type="link" onClick={() => deleteBlog(record.id)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={blogs}></Table>
    </div>
  );
};

export default UserBlogs;
