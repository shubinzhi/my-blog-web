<template>
  <div class="tag-manage">
    <div class="header">
      <h2>标签管理</h2>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon> 新增标签
      </el-button>
    </div>

    <el-table :data="tags" v-loading="loading">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="color" label="颜色" width="150">
        <template #default="{ row }">
          <el-tag :color="row.color">{{ row.color }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑标签' : '新增标签'" width="500">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称" :error="nameError">
          <el-input v-model="form.name" placeholder="请输入标签名称" @blur="checkName" />
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker v-model="form.color" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { cmsApi } from '@/api'
import type { Tag } from '@/types'
import { ElMessageBox, ElMessage } from 'element-plus'

const tags = ref<Tag[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const nameError = ref('')

const form = reactive<Partial<Tag>>({
  id: undefined,
  name: '',
  color: '#409EFF'
})

const loadTags = async () => {
  loading.value = true
  try {
    const res = await cmsApi.getTagList()
    tags.value = res.data
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  isEdit.value = false
  nameError.value = ''
  Object.assign(form, { id: undefined, name: '', color: '#409EFF' })
  dialogVisible.value = true
}

const handleEdit = (row: Tag) => {
  isEdit.value = true
  nameError.value = ''
  Object.assign(form, row)
  dialogVisible.value = true
}

const checkName = async () => {
  if (!form.name) {
    nameError.value = '名称不能为空'
    return false
  }
  const res = await cmsApi.checkTagName(form.name, form.id)
  if (!res.data) {
    nameError.value = '标签名称已存在'
    return false
  }
  nameError.value = ''
  return true
}

const handleSave = async () => {
  if (!await checkName()) return
  await cmsApi.saveTag(form as Tag)
  ElMessage.success('保存成功')
  dialogVisible.value = false
  loadTags()
}

const handleDelete = async (id: string) => {
  await ElMessageBox.confirm('确定删除该标签吗？', '提示')
  await cmsApi.deleteTag(id)
  ElMessage.success('删除成功')
  loadTags()
}

onMounted(loadTags)
</script>

<style lang="scss" scoped>
.tag-manage {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
