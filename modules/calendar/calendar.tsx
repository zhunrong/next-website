import React, { FunctionComponent } from 'react';
import PageLayout from '@/components/pageLayout/pageLayout';
import Header from '@/modules/header';
import style from './calendar.module.scss';

const Calendar: FunctionComponent = () => {
  return (
    <PageLayout docTitle={'日历'}>
      <Header />
      <div className={style['calendar-wrapper']}>calendar</div>
    </PageLayout>
  );
};

export default Calendar;
