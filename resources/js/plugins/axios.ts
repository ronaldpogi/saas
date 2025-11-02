import { useToastStore } from '@/store/toastStore'
import { useSaasAuthStore } from '@/modules/saas/store/saasAuthSore'
import axios from 'axios'

const subdomain = window.location.hostname.split('.')[0] + '.'

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || `https://${subdomain}api.ronald-bibon.click/api`,
  baseURL: import.meta.env.VITE_API_URL || `http://${subdomain}localhost/api`,
  // baseURL: import.meta.env.VITE_API_URL || `https://tenant-one.api.ronald-bibon.click/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const auth = useSaasAuthStore()
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => {
    const toast = useToastStore()
    // Example: show success toast for specific responses
    // Adjust the condition based on your API structure
    if (response.config.method !== 'get') {
      // maybe only for POST/PUT/DELETE
      toast.addAlert(
        'success',
        'Success',
        response.data.message || 'Operation completed successfully.'
      )
    }
    return response
  },
  (error) => {
    const toast = useToastStore()
    toast.addAlert(
      'error',
      'Error',
      error.response?.data?.message || 'Something went wrong'
    )
    return Promise.reject(error)
  }
)

export default api
