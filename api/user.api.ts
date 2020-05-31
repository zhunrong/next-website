import http from '../utils/http';

/**
 * 登录
 * @param email
 * @param password
 */
export function login(email: string, password: string) {
  return http<Data>({
    url: '/login',
    method: 'post',
    data: {
      email,
      password,
    },
  });
}
