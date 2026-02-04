<template>
  <div class="dashboard">
    <h2>仪表盘</h2>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="icon" style="background: #409eff">
            <el-icon><Document /></el-icon>
          </div>
          <div class="info">
            <div class="value">{{ stats.articleCount }}</div>
            <div class="label">文章数</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="icon" style="background: #67c23a">
            <el-icon><Folder /></el-icon>
          </div>
          <div class="info">
            <div class="value">{{ stats.categoryCount }}</div>
            <div class="label">分类数</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="icon" style="background: #e6a23c">
            <el-icon><PriceTag /></el-icon>
          </div>
          <div class="info">
            <div class="value">{{ stats.tagCount }}</div>
            <div class="label">标签数</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="icon" style="background: #f56c6c">
            <el-icon><View /></el-icon>
          </div>
          <div class="info">
            <div class="value">{{ stats.viewCount }}</div>
            <div class="label">总浏览</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { cmsApi } from '@/api'

const stats = ref({
  articleCount: 0,
  categoryCount: 0,
  tagCount: 0,
  viewCount: 0
})

onMounted(async () => {
  const [articles, categories, tags] = await Promise.all([
    cmsApi.getArticlePage({ page: 1, size: 1 }),
    cmsApi.getCategoryList(),
    cmsApi.getTagList()
  ])
  stats.value.articleCount = articles.data.total
  stats.value.categoryCount = categories.data.length
  stats.value.tagCount = tags.data.length
})
</script>

<style lang="scss" scoped>
.dashboard {
  h2 { margin-bottom: 24px; }

  .stat-card {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;

    .icon {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 28px;
      margin-right: 16px;
    }

    .value {
      font-size: 28px;
      font-weight: 600;
      color: #303133;
    }

    .label {
      color: #909399;
      font-size: 14px;
    }
  }
}
</style>
