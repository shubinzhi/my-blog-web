import request from '@/utils/request'
import type { PageRequest, PageResult, Article, Category, Tag, LoginVO } from '@/types'

// 博客前台 API
export const blogApi = {
  // 分页查询文章
  getArticlePage: (params: PageRequest<{ keyword?: string; categoryId?: string; tagId?: string }>) =>
    request.post<any, { data: PageResult<Article> }>('/api/article/page', params),

  // 获取文章详情
  getArticleDetail: (id: string) =>
    request.get<any, { data: Article }>(`/api/article/${id}`),

  // 获取分类列表
  getCategoryList: () =>
    request.get<any, { data: Category[] }>('/api/category/list'),

  // 获取标签列表
  getTagList: () =>
    request.get<any, { data: Tag[] }>('/api/tag/list')
}

// CMS 管理 API
export const cmsApi = {
  // 用户登录
  login: (data: { username: string; password: string }) =>
    request.post<any, { data: LoginVO }>('/cms/user/login', data),

  // 用户登出
  logout: () => request.post('/cms/user/logout'),

  // 获取当前用户
  getUserInfo: () => request.get('/cms/user/info'),

  // 文章管理
  getArticlePage: (params: PageRequest<any>) =>
    request.post<any, { data: PageResult<Article> }>('/cms/article/page', params),

  getArticleDetail: (id: string) =>
    request.get<any, { data: Article }>(`/cms/article/${id}`),

  saveArticle: (data: any) =>
    request.post<any, { data: string }>('/cms/article', data),

  deleteArticle: (id: string) =>
    request.delete(`/cms/article/${id}`),

  publishArticle: (id: string, status: number) =>
    request.put(`/cms/article/${id}/publish?status=${status}`),

  // 分类管理
  getCategoryList: () =>
    request.get<any, { data: Category[] }>('/cms/category/list'),

  saveCategory: (data: Category) =>
    request.post('/cms/category', data),

  deleteCategory: (id: string) =>
    request.delete(`/cms/category/${id}`),

  // 标签管理
  getTagList: () =>
    request.get<any, { data: Tag[] }>('/cms/tag/list'),

  saveTag: (data: Tag) =>
    request.post('/cms/tag', data),

  deleteTag: (id: string) =>
    request.delete(`/cms/tag/${id}`),

  // 唯一性校验
  checkUsername: (username: string, excludeId?: string) =>
    request.get<any, { data: boolean }>('/cms/check/username', { params: { username, excludeId } }),

  checkCategoryName: (name: string, excludeId?: string) =>
    request.get<any, { data: boolean }>('/cms/check/category-name', { params: { name, excludeId } }),

  checkTagName: (name: string, excludeId?: string) =>
    request.get<any, { data: boolean }>('/cms/check/tag-name', { params: { name, excludeId } })
}
