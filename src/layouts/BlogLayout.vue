<template>
  <div class="blog-layout">
    <header class="header">
      <div class="container">
        <router-link to="/" class="logo">My Blog</router-link>
        <nav class="nav">
          <router-link to="/">首页</router-link>
          <router-link to="/cms">管理</router-link>
        </nav>
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <p>© 2024 My Blog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.blog-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 24px;
    font-weight: 600;
    color: #409eff;
  }

  .nav {
    display: flex;
    gap: 24px;

    a {
      color: #606266;
      transition: color 0.3s;

      &:hover,
      &.router-link-active {
        color: #409eff;
      }
    }
  }
}

.main {
  flex: 1;
  background: #f5f7fa;
  padding: 24px 0;
}

.footer {
  background: #fff;
  padding: 20px;
  text-align: center;
  color: #909399;
  font-size: 14px;
}
</style>
