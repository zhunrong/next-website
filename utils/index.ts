export function publicPath(path: string) {
  return (process.env.PROXY_PREFIX || '') + path;
}
