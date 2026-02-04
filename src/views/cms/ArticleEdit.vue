<template>
  <div class="article-edit">
    <div class="header">
      <h2>{{ isEdit ? '编辑文章' : '新增文章' }}</h2>
      <div>
        <el-button @click="handleSave(0)">保存草稿</el-button>
        <el-button type="primary" @click="handleSave(1)">发布文章</el-button>
      </div>
    </div>

    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.categoryId" placeholder="请选择分类">
          <el-option
            v-for="cat in categories"
            :key="cat.id"
            :label="cat.name"
            :value="cat.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tagIds" multiple placeholder="请选择标签">
          <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="form.summary" type="textarea" :rows="3" placeholder="请输入摘要" />
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="form.coverImage" placeholder="请输入封面图 URL" />
      </el-form-item>
      <el-form-item label="置顶">
        <el-switch v-model="form.isTop" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="内容">
        <MdEditor v-model="form.content" style="height: 500px" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cmsApi } from '@/api'
import type { Category, Tag } from '@/types'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const isEdit = !!route.params.id
const categories = ref<Category[]>([])
const tags = ref<Tag[]>([])

const form = reactive({
  id: route.params.id as string || undefined,
  title: '',
  summary: '',
  content: '',
  coverImage: '',
  categoryId: '',
  tagIds: [] as string[],
  isTop: 0,
  status: 0
})

const loadData = async () => {
  const [catRes, tagRes] = await Promise.all([
    cmsApi.getCategoryList(),
    cmsApi.getTagList()
  ])
  categories.value = catRes.data
  tags.value = tagRes.data

  if (isEdit) {
    const res = await cmsApi.getArticleDetail(route.params.id as string)
    Object.assign(form, {
      ...res.data,
      tagIds: res.data.tags?.map((t: Tag) => t.id) || []
    })
  }
}

const handleSave = async (status: number) => {
  if (!form.title) {
    ElMessage.warning('请输入标题')
    return
  }
  form.status = status
  await cmsApi.saveArticle(form)
  ElMessage.success('保存成功')
  router.push('/cms/article')
}

onMounted(loadData)
</script>

<style lang="scss" scoped>
.article-edit {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
