// 通用响应
export interface R<T> {
  code: number
  msg: string
  data: T
}

// 分页响应
export interface PageResult<T> {
  records: T[]
  total: number
  size: number
  current: number
}

// 分页请求
export interface PageRequest<T> {
  page: number
  size: number
  data?: T
}

// 文章
export interface Article {
  id: string
  title: string
  summary: string
  content: string
  coverImage: string
  categoryId: string
  categoryName: string
  tags: Tag[]
  viewCount: number
  isTop: number
  status: number
  createTime: string
  updateTime: string
}

// 分类
export interface Category {
  id: string
  name: string
  description: string
  sort: number
  createTime: string
}

// 标签
export interface Tag {
  id: string
  name: string
  color: string
  createTime: string
}

// 用户
export interface User {
  id: string
  username: string
  nickname: string
  avatar: string
  status: number
}

// 登录响应
export interface LoginVO {
  token: string
  nickname: string
  avatar: string
}
