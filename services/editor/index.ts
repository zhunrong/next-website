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
