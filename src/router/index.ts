import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/BlogLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/blog/Home.vue')
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: () => import('@/views/blog/ArticleDetail.vue')
      },
      {
        path: 'category/:id',
        name: 'Category',
        component: () => import('@/views/blog/Category.vue')
      },
      {
        path: 'tag/:id',
        name: 'Tag',
        component: () => import('@/views/blog/Tag.vue')
      }
    ]
  },
  {
    path: '/cms',
    component: () => import('@/layouts/CmsLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/cms/Login.vue')
      },
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/cms/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'article',
        name: 'ArticleManage',
        component: () => import('@/views/cms/ArticleManage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'article/edit/:id?',
        name: 'ArticleEdit',
        component: () => import('@/views/cms/ArticleEdit.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'category',
        name: 'CategoryManage',
        component: () => import('@/views/cms/CategoryManage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'tag',
        name: 'TagManage',
        component: () => import('@/views/cms/TagManage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
