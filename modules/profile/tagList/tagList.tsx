import React, { FunctionComponent, useEffect, useState } from 'react';
import style from './tagList.module.scss';
import * as API from '@/api';
import AddTag from './addTag';

export const TagList: FunctionComponent = () => {
  const [tags, setTags] = useState<TagEntity[]>([]);
  useEffect(() => {
    getTagList();
  }, []);
  const getTagList = async () => {
    const [, res] = await API.getTagList();
    if (res.status === 'success') {
      setTags(res.data);
    }
  };
  return (
    <div className={style['tag-list']}>
      <div className="tag-list-title">标签管理</div>
      <div className="tool-bar">
        <AddTag onCreated={() => getTagList()} />
      </div>
      <ul className="list">
        {tags.map((tag) => {
          const { id, name } = tag;
          return (
            <li key={id}>
              <div className="name">{name}</div>
              <div className="relation">
                与<span>{name}</span>相关的博客有10篇
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagList;
