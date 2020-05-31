/**
 * 保存登录信息
 * @param email
 * @param password
 * @param remember
 */
export function saveLoginInfo(
  email: string,
  password: string,
  remember: boolean
) {
  localStorage.setItem(
    'login-info',
    JSON.stringify({
      email,
      password,
      remember,
    })
  );
}

/**
 * 获取登录信息
 */
export function getLoginInfo() {
  const content = localStorage.getItem('login-info');
  return content ? JSON.parse(content) : { remember: false };
}
