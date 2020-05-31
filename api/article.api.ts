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

/**
 * 创建草稿
 */
export function createDraft() {
  return http<Data<DraftEntity>>({
    url: '/draft/create',
    method: 'post',
  });
}

/**
 * 获取草稿
 * @param id
 */
export function getDraft(id: string, cookie?: string) {
  return http<Data<DraftEntity>>({
    url: `/draft/${id}`,
    headers: {
      Cookie: cookie,
    },
  });
}

/**
 * 获取用户的草稿列表
 */
export function getDraftList() {
  return http<Data<DraftEntity[]>>({
    url: '/draft/list',
  });
}

interface UpdateDraftParams {
  id: string;
  title: string;
  html: string;
  raw: string;
}
/**
 * 更新草稿
 * @param data
 */
export function updateDraft(data: UpdateDraftParams) {
  return http({
    url: '/draft/update',
    method: 'post',
    data,
  });
}
