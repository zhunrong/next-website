import React, { FunctionComponent, useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import style from './index.module.scss';
import * as API from '@/api';
import Link from 'next/link';

const DraftBox: FunctionComponent = () => {
  const [drafts, setDrafts] = useState<DraftEntity[]>([]);
  useEffect(() => {
    (async () => {
      const [, data] = await API.getDraftList();
      if (data.status === 'success') {
        setDrafts(data.data);
      }
    })();
  }, []);
  const columns: ColumnType<DraftEntity>[] = [
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
      render: function Action(text, record) {
        return (
          <Space size="middle">
            <Link href="/editor/[id]" as={`/editor/${record.id}`}>
              <a>编辑</a>
            </Link>
            <a>删除</a>
          </Space>
        );
      },
    },
  ];
  return (
    <div className={style['draft']}>
      <div className="draft-title">我的草稿</div>
      <Table rowKey="id" columns={columns} dataSource={drafts}></Table>
    </div>
  );
};

export default DraftBox;
