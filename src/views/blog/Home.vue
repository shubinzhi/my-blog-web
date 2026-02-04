<template>
  <div class="home">
    <div class="container">
      <div class="content">
        <div class="article-list">
          <div v-for="article in articles" :key="article.id" class="article-card">
            <div class="cover" v-if="article.coverImage">
              <img :src="article.coverImage" :alt="article.title" />
            </div>
            <div class="info">
              <div class="meta">
                <span class="category">{{ article.categoryName }}</span>
                <span class="date">{{ formatDate(article.createTime) }}</span>
              </div>
              <router-link :to="`/article/${article.id}`" class="title">
                <el-tag v-if="article.isTop" type="danger" size="small">置顶</el-tag>
                {{ article.title }}
              </router-link>
              <p class="summary">{{ article.summary }}</p>
              <div class="tags">
                <el-tag v-for="tag in article.tags" :key="tag.id" :color="tag.color" size="small">
                  {{ tag.name }}
                </el-tag>
              </div>
              <div class="stats">
                <span><el-icon><View /></el-icon> {{ article.viewCount }}</span>
              </div>
            </div>
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
      <aside class="sidebar">
        <div class="widget">
          <h3>分类</h3>
          <div class="category-list">
            <router-link
              v-for="cat in categories"
              :key="cat.id"
              :to="`/category/${cat.id}`"
              class="category-item"
            >
              {{ cat.name }}
            </router-link>
          </div>
        </div>
        <div class="widget">
          <h3>标签</h3>
          <div class="tag-cloud">
            <router-link
              v-for="tag in tags"
              :key="tag.id"
              :to="`/tag/${tag.id}`"
            >
              <el-tag :color="tag.color">{{ tag.name }}</el-tag>
            </router-link>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { blogApi } from '@/api'
import type { Article, Category, Tag } from '@/types'
import dayjs from 'dayjs'

const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const tags = ref<Tag[]>([])
const page = ref(1)
const total = ref(0)

const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DD')

const loadArticles = async () => {
  const res = await blogApi.getArticlePage({ page: page.value, size: 10 })
  articles.value = res.data.records
  total.value = res.data.total
}

const loadCategories = async () => {
  const res = await blogApi.getCategoryList()
  categories.value = res.data
}

const loadTags = async () => {
  const res = await blogApi.getTagList()
  tags.value = res.data
}

onMounted(() => {
  loadArticles()
  loadCategories()
  loadTags()
})
</script>

<style lang="scss" scoped>
.home {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    gap: 24px;
  }

  .content {
    flex: 1;
  }

  .article-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
    display: flex;

    .cover {
      width: 200px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      padding: 16px;
      flex: 1;
    }

    .meta {
      font-size: 12px;
      color: #909399;
      margin-bottom: 8px;
      .category {
        margin-right: 12px;
        color: #409eff;
      }
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
      display: block;
      margin-bottom: 8px;
      &:hover {
        color: #409eff;
      }
    }

    .summary {
      color: #606266;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .tags {
      margin-bottom: 8px;
      .el-tag {
        margin-right: 8px;
      }
    }

    .stats {
      font-size: 12px;
      color: #909399;
    }
  }

  .sidebar {
    width: 280px;
    flex-shrink: 0;
  }

  .widget {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;

    h3 {
      font-size: 16px;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ebeef5;
    }
  }

  .category-list {
    .category-item {
      display: block;
      padding: 8px 0;
      color: #606266;
      border-bottom: 1px dashed #ebeef5;
      &:hover {
        color: #409eff;
      }
    }
  }

  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
