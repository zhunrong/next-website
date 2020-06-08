import React, { FunctionComponent, useEffect, useState } from 'react';
import { Space, Table, Popconfirm, message as Message, Tag } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';
import style from './index.module.scss';
import * as API from '@/api';
import Link from 'next/link';

const DraftBox: FunctionComponent = () => {
  const [drafts, setDrafts] = useState<DraftEntity[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal(total) {
      return `总共${total}篇`;
    },
  });
  useEffect(() => {
    const { current, pageSize } = pagination;
    getDrafts(current, pageSize);
  }, []);
  /**
   * 获取草稿列表
   */
  const getDrafts = async (current: number, pageSize: number) => {
    const [, data] = await API.getDraftList(current, pageSize);
    if (data.status === 'success') {
      setDrafts(data.data);
      setPagination(
        Object.assign({}, pagination, {
          current: data.meta.page,
          pageSize: data.meta.pageSize,
          total: data.meta.total,
        })
      );
    } else {
      Message.error(data.message);
    }
  };
  /**
   * 删除草稿
   * @param id
   */
  const deleteDraft = async (id: string) => {
    const [, data] = await API.deleteDraft(id);
    if (data.status === 'success') {
      Message.success('操作成功');
      const { current, pageSize } = pagination;
      getDrafts(current, pageSize);
    } else {
      Message.error(data.message);
    }
  };
  /**
   * 同步到博客
   * @param id
   */
  const syncBlog = async (id: string) => {
    const [, data] = await API.syncDraft(id);
    if (data.status === 'success') {
      Message.success('操作成功');
      const { current, pageSize } = pagination;
      getDrafts(current, pageSize);
    } else {
      Message.error(data.message);
    }
  };
  /**
   * 翻页
   * @param pageConf
   */
  const handleTableChange = (pageConf: TablePaginationConfig) => {
    const { pageSize, current } = pageConf;
    getDrafts(current, pageSize);
  };
  const columns: ColumnType<DraftEntity>[] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'sync',
      render(text, record) {
        return record.sync === 0 ? (
          <Tag color="cyan">未发布</Tag>
        ) : (
          <Tag color="purple">未同步</Tag>
        );
      },
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
            <Link href="/editor/[id]" as={`/editor/${record.id}`}>
              <a>编辑</a>
            </Link>
            <Popconfirm
              title={`确定删除【${record.title}】吗？`}
              onConfirm={() => deleteDraft(record.id)}
              okText="没错"
              cancelText="误会"
            >
              <a href="void:0">删除</a>
            </Popconfirm>
            <a href="void:0" onClick={() => syncBlog(record.id)}>
              {record.sync === 0 ? '发布' : '同步'}
            </a>
          </Space>
        );
      },
    },
  ];
  return (
    <div className={style['draft']}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={drafts}
        pagination={pagination}
        onChange={handleTableChange}
      ></Table>
    </div>
  );
};

export default DraftBox;
