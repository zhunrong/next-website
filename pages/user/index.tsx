import React from 'react';
import { NextPage } from 'next';
import style from './index.module.scss';
import Header from '@/modules/header';
import DraftBox from '@/modules/draftBox';

const UserView: NextPage = () => {
  return (
    <div className={style['user']}>
      <Header></Header>
      <div className="user-main shadow">
        <DraftBox></DraftBox>
      </div>
    </div>
  );
};

export default UserView;
