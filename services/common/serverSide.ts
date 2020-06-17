import * as API from '@/api';
import { initializeStore } from '@/store/store';
import { createUpdateUser } from '@/store/action/action';
import { GetServerSidePropsContext } from 'next';

/**
 * 获取用户状态
 * @param ctx
 */
export async function getUserState(ctx: GetServerSidePropsContext) {
  const cookie = ctx.req.headers.cookie || '';
  const [, res] = await API.getUserInfo(cookie);
  let user: UserEntity = null;
  if (res.status === 'success') {
    user = res.data;
  }
  const store = initializeStore();
  store.dispatch(createUpdateUser(user));
  return store.getState();
}
