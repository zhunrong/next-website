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

export interface UpdateUserInfoParams {
  avatar?: string;
  nickname?: string;
}
/**
 * 更新用户信息
 * @param params
 */
export function updateUserInfo(params: UpdateUserInfoParams) {
  return http<Data<UserEntity>>({
    url: '/user',
    method: 'put',
    data: params,
  });
}

/**
 * 更新用户密码
 * @param oldPassword
 * @param newPassword
 */
export function updateUserPassword(oldPassword: string, newPassword: string) {
  return http<Data<UserEntity>>({
    url: '/user/password',
    method: 'put',
    data: {
      oldPassword,
      newPassword,
    },
  });
}

/**
 * 获取上传令牌
 * @param type
 */
export function getUploadToken(type?: 'user') {
  return http<Data<UploadTokenEntity>>({
    url: '/qcloud/uploadCredential',
    params: {
      type,
    },
  });
}
