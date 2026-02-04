<template>
  <div class="category-page">
    <div class="container">
      <h2>分类: {{ categoryName }}</h2>
      <div class="article-list">
        <div v-for="article in articles" :key="article.id" class="article-item">
          <router-link :to="`/article/${article.id}`" class="title">
            {{ article.title }}
          </router-link>
          <span class="date">{{ formatDate(article.createTime) }}</span>
        </div>
      </div>
      <el-pagination
        v-model:current-page="page"
        :page-size="10"
        :total="total"
        layout="prev, pager, next"
        @current-change="loadArticles"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { blogApi } from '@/api'
import type { Article } from '@/types'
import dayjs from 'dayjs'

const route = useRoute()
const articles = ref<Article[]>([])
const categoryName = ref('')
const page = ref(1)
const total = ref(0)

const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DD')

const loadArticles = async () => {
  const categoryId = route.params.id as string
  const res = await blogApi.getArticlePage({
    page: page.value,
    size: 10,
    data: { categoryId }
  })
  articles.value = res.data.records
  total.value = res.data.total
  if (res.data.records.length > 0) {
    categoryName.value = res.data.records[0].categoryName
  }
}

watch(() => route.params.id, loadArticles)
onMounted(loadArticles)
</script>

<style lang="scss" scoped>
.category-page {
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }

  h2 {
    margin-bottom: 24px;
  }

  .article-item {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      color: #303133;
      &:hover { color: #409eff; }
    }

    .date {
      color: #909399;
      font-size: 14px;
    }
  }
}
</style>
