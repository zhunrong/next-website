/**
 * 将文章暂存到本地
 * @param id
 * @param raw
 * @param html
 */
export function saveToLocal(id: string, raw: string, html: string) {
  sessionStorage.setItem(
    'doc',
    JSON.stringify({
      id,
      raw,
      html,
    })
  );
}

/**
 * 从本地读取文章
 * @param id
 */
export function getFromLocal(id: string) {
  const content = sessionStorage.getItem(id);
  return content ? JSON.parse(content) : { html: '' };
}
