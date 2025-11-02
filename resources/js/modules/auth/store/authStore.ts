import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { authService } from '@/modules/auth/service/authService'
import type { LoginFormInterface, RegisterFormInterface } from '@/types/auth'
import type { UserInterface } from '@/types/user'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInterface | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const errors = ref<any>({})

  const hasRole = (role: string) => user.value?.roles?.includes(role) ?? false
  const hasPermission = (perm: string) => user.value?.permissions?.includes(perm) ?? false

  const registerForm = reactive<RegisterFormInterface>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    name: '',
    address: '',
    subdomain: '',
    settings: [],
    password: '',
    password_confirmation: '',
  })

  const loginForm = reactive<LoginFormInterface>({
    email: '',
    password: '',
  })

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const register = async () => {
    try {
      loading.value = true
      errors.value = {}
      const data = await authService.register(registerForm)
      router.push('login')
      return data
    } catch (err: any) {
      errors.value = err.response?.data?.errors
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const login = async () => {
    try {
      loading.value = true
      errors.value = {}
      const data = await authService.login(loginForm)
      setToken(data.data.token)
      user.value = data.data.user
      router.push('dashboard')
    } catch (err: any) {
      errors.value = err.response?.data?.errors || 'login error'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
      user.value = await authService.fetchUser()
    } catch {
      logout()
    }
  }

  const logout = async () => {
    await authService.logout()
    setToken(null)
    user.value = null
    router.push('login')
  }

  const init = async () => {
    if (token.value && !user.value) {
      await fetchUser()
    }
  }

  return {
    isAuthenticated: computed(() => !!token.value),
    token,
    user,
    loading,
    errors,
    registerForm,
    loginForm,
    init,
    register,
    login,
    fetchUser,
    logout,
    hasRole,
    hasPermission
  }
})
