import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cmsApi } from '@/api'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const nickname = ref(localStorage.getItem('nickname') || '')
  const avatar = ref(localStorage.getItem('avatar') || '')

  const login = async (username: string, password: string) => {
    const res = await cmsApi.login({ username, password })
    token.value = res.data.token
    nickname.value = res.data.nickname
    avatar.value = res.data.avatar || ''
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('nickname', res.data.nickname)
    localStorage.setItem('avatar', res.data.avatar || '')
  }

  const logout = async () => {
    try {
      await cmsApi.logout()
    } finally {
      token.value = ''
      nickname.value = ''
      avatar.value = ''
      localStorage.removeItem('token')
      localStorage.removeItem('nickname')
      localStorage.removeItem('avatar')
    }
  }

  return { token, nickname, avatar, login, logout }
})
