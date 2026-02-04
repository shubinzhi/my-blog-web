<template>
  <div class="cms-layout">
    <template v-if="isLoginPage">
      <router-view />
    </template>
    <template v-else>
      <el-container class="layout-container">
        <el-aside width="200px" class="aside">
          <div class="logo">CMS 管理</div>
          <el-menu
            :default-active="route.path"
            router
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409eff"
          >
            <el-menu-item index="/cms">
              <el-icon><DataAnalysis /></el-icon>
              <span>仪表盘</span>
            </el-menu-item>
            <el-menu-item index="/cms/article">
              <el-icon><Document /></el-icon>
              <span>文章管理</span>
            </el-menu-item>
            <el-menu-item index="/cms/category">
              <el-icon><Folder /></el-icon>
              <span>分类管理</span>
            </el-menu-item>
            <el-menu-item index="/cms/tag">
              <el-icon><PriceTag /></el-icon>
              <span>标签管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header class="header">
            <div class="user-info">
              <span>{{ userStore.nickname }}</span>
              <el-button type="primary" link @click="handleLogout">退出</el-button>
            </div>
          </el-header>
          <el-main class="main">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const isLoginPage = computed(() => route.path === '/cms/login')

const handleLogout = async () => {
  await userStore.logout()
  router.push('/cms/login')
}
</script>

<style lang="scss" scoped>
.cms-layout {
  height: 100vh;
}

.layout-container {
  height: 100%;
}

.aside {
  background: #304156;

  .logo {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }
}

.header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}

.main {
  background: #f5f7fa;
}
</style>
