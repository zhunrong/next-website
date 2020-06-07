export function publicPath(path: string) {
  return (process.env.PROXY_PREFIX || '') + path;
}

type Callback = (...args: any[]) => void;
/**
 * 防抖
 * @param callback
 * @param delay
 */
export function debounce(callback: Callback, delay: number) {
  let timeoutId = 0;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.call(this, ...args);
    }, delay);
  };
}
