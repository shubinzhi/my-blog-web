<template>
  <div class="article-manage">
    <div class="header">
      <h2>文章管理</h2>
      <el-button type="primary" @click="$router.push('/cms/article/edit')">
        <el-icon><Plus /></el-icon> 新增文章
      </el-button>
    </div>

    <el-table :data="articles" v-loading="loading">
      <el-table-column prop="title" label="标题" min-width="200" />
      <el-table-column prop="categoryName" label="分类" width="120" />
      <el-table-column prop="viewCount" label="浏览" width="80" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusMap[row.status].type">
            {{ statusMap[row.status].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="$router.push(`/cms/article/edit/${row.id}`)">
            编辑
          </el-button>
          <el-button link type="success" v-if="row.status !== 1" @click="handlePublish(row.id, 1)">
            发布
          </el-button>
          <el-button link type="warning" v-if="row.status === 1" @click="handlePublish(row.id, 2)">
            下架
          </el-button>
          <el-button link type="danger" @click="handleDelete(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="page"
      :page-size="10"
      :total="total"
      layout="total, prev, pager, next"
      @current-change="loadArticles"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { cmsApi } from '@/api'
import type { Article } from '@/types'
import { ElMessageBox, ElMessage } from 'element-plus'
import dayjs from 'dayjs'

const articles = ref<Article[]>([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)

const statusMap: Record<number, { text: string; type: string }> = {
  0: { text: '草稿', type: 'info' },
  1: { text: '已发布', type: 'success' },
  2: { text: '已下架', type: 'warning' }
}

const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm')

const loadArticles = async () => {
  loading.value = true
  try {
    const res = await cmsApi.getArticlePage({ page: page.value, size: 10 })
    articles.value = res.data.records
    total.value = res.data.total
  } finally {
    loading.value = false
  }
}

const handlePublish = async (id: string, status: number) => {
  await cmsApi.publishArticle(id, status)
  ElMessage.success(status === 1 ? '发布成功' : '下架成功')
  loadArticles()
}

const handleDelete = async (id: string) => {
  await ElMessageBox.confirm('确定删除该文章吗？', '提示')
  await cmsApi.deleteArticle(id)
  ElMessage.success('删除成功')
  loadArticles()
}

onMounted(loadArticles)
</script>

<style lang="scss" scoped>
.article-manage {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .el-pagination {
    margin-top: 20px;
    justify-content: flex-end;
  }
}
</style>
