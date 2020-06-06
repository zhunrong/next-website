import React, { FunctionComponent, useEffect, useState } from 'react';
import { Space, Table, message as Message, Popconfirm } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';
import * as API from '@/api';
import Link from 'next/link';

const UserBlogs: FunctionComponent = () => {
  const [blogs, setBlogs] = useState<BlogEntity[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 2,
    total: 0,
    showTotal(total) {
      return `总共${total}篇`;
    },
  });
  useEffect(() => {
    const { current, pageSize } = pagination;
    getBlogs(current, pageSize);
  }, []);
  /**
   * 获取blog列表
   */
  const getBlogs = async (current: number, pageSize: number) => {
    const [, data] = await API.getUserBlogList(current, pageSize);
    if (data.status === 'success') {
      setBlogs(data.data);
      setPagination(
        Object.assign({}, pagination, {
          current: data.meta.page,
          pageSize: data.meta.pageSize,
          total: data.meta.total,
        })
      );
    }
  };
  /**
   * 删除blog
   * @param id
   */
  const deleteBlog = async (id: string) => {
    const [, data] = await API.deleteBlog([id]);
    if (data.status === 'success') {
      const { current, pageSize } = pagination;
      getBlogs(current, pageSize);
      Message.success('删除成功');
    } else {
      Message.error(data.message);
    }
  };
  /**
   * 翻页
   * @param pageConf
   */
  const handleTableChange = (pageConf: PaginationConfig) => {
    const { current, pageSize } = pageConf;
    getBlogs(current, pageSize);
  };
  const columns: ColumnType<BlogEntity>[] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: function Action(text, record) {
        return (
          <Space size="middle">
            <Link href="/editor/[id]" as={`/editor/${record.draftId}`}>
              <a>编辑</a>
            </Link>
            <Popconfirm
              title={`确定删除【${record.title}】吗？`}
              onConfirm={() => deleteBlog(record.id)}
              okText="没错"
              cancelText="误会"
            >
              <a href="void:0">删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={blogs}
        pagination={pagination}
        onChange={handleTableChange}
      ></Table>
    </div>
  );
};

export default UserBlogs;
