import http from '../utils/http';

/**
 * 获取文章详情
 * @param id
 */
export function getArticleDetail(id: string) {
  return http<Data<BlogEntity>>({
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
export function getDraftList(page = 1, pageSize = 20) {
  return http<Data<DraftEntity[]>>({
    url: '/draft/list',
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * 获取所有博客
 */
export function getBlogList() {
  return http<Data<BlogEntity[]>>({
    url: '/article/all',
  });
}

/**
 * 获取用户的博客
 */
export function getUserBlogList(page = 1, pageSize = 20) {
  return http<Data<BlogEntity[]>>({
    url: '/article/user',
    params: {
      page,
      pageSize,
    },
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
  return http<Data>({
    url: '/draft/update',
    method: 'post',
    data,
  });
}

/**
 * 删除草稿
 * @param id
 */
export function deleteDraft(id: string) {
  return http<Data>({
    url: '/draft/delete',
    method: 'post',
    data: {
      id,
    },
  });
}

/**
 * 删除博客
 * @param ids
 */
export function deleteBlog(ids: string[]) {
  return http<Data>({
    url: '/article/delete',
    method: 'post',
    data: {
      ids,
    },
  });
}

/**
 * 同步草稿到博客
 * @param id
 */
export function syncDraft(id: string) {
  return http<Data>({
    url: '/draft/sync',
    method: 'post',
    data: {
      id,
    },
  });
}
