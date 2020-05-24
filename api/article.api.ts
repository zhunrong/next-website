import http from '../utils/http';
/**
 * 获取所有文章
 */
export function getAllArticles(pageSize: number, page: number) {
  return http({
    url: '/allArticle',
    params: {
      pageSize,
      page,
    },
  });
}

/**
 * 获取文章详情
 * @param id
 */
export function getArticleDetail(id: string) {
  return http({
    url: `/article/${id}`,
  });
}
