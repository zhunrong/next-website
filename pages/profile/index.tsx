import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { getUserState } from '@/services/common/serverSide';
import { useUserAndRedirect } from '@/services/hooks/hooks';
import Profile from '@/modules/profile/profile';

const ProfilePage: NextPage = () => {
  const user = useUserAndRedirect();
  if (!user) return null;
  return <Profile />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const state = await getUserState(ctx);
  return {
    props: {
      initialState: state,
    },
  };
};

export default ProfilePage;
