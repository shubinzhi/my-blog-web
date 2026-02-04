<template>
  <div class="article-detail">
    <div class="container">
      <article class="article" v-if="article">
        <header class="header">
          <h1>{{ article.title }}</h1>
          <div class="meta">
            <span>{{ article.categoryName }}</span>
            <span>{{ formatDate(article.createTime) }}</span>
            <span><el-icon><View /></el-icon> {{ article.viewCount }}</span>
          </div>
          <div class="tags">
            <el-tag v-for="tag in article.tags" :key="tag.id" :color="tag.color">
              {{ tag.name }}
            </el-tag>
          </div>
        </header>
        <div class="cover" v-if="article.coverImage">
          <img :src="article.coverImage" :alt="article.title" />
        </div>
        <MdPreview :modelValue="article.content" />
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { blogApi } from '@/api'
import type { Article } from '@/types'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import dayjs from 'dayjs'

const route = useRoute()
const article = ref<Article | null>(null)

const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm')

onMounted(async () => {
  const id = route.params.id as string
  const res = await blogApi.getArticleDetail(id)
  article.value = res.data
})
</script>

<style lang="scss" scoped>
.article-detail {
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .article {
    background: #fff;
    border-radius: 8px;
    padding: 32px;
  }

  .header {
    text-align: center;
    margin-bottom: 24px;

    h1 {
      font-size: 28px;
      margin-bottom: 16px;
    }

    .meta {
      color: #909399;
      font-size: 14px;
      span {
        margin: 0 8px;
      }
    }

    .tags {
      margin-top: 12px;
      .el-tag {
        margin: 0 4px;
      }
    }
  }

  .cover {
    margin-bottom: 24px;
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>
