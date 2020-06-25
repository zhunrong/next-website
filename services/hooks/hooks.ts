import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * hook:获取用户
 */
export function useUser() {
  return useSelector((state: GlobalState) => state.user);
}

/**
 * hook:获取用户，如果为null则自动跳转到首页
 */
export function useUserAndRedirect() {
  const user = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.replace('/');
  }, [user]);
  return user;
}
