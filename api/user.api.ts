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

/**
 * 注销登录
 */
export function logout() {
  return http<Data>({
    url: '/logout',
    method: 'post',
  });
}

/**
 * 获取用户信息
 */
export function getUserInfo(cookie?: string) {
  return http<Data<UserEntity>>({
    url: '/user',
    headers: {
      Cookie: cookie,
    },
  });
}
