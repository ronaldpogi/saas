import { useToastStore } from '@/store/toastStore'
import { useAuthStore } from '@/modules/auth/store/authStore'
import axios from 'axios'

const subdomain = window.location.hostname.split('.')[0] + '.'

// Detect if we're on bare localhost — if so, remove duplicate "localhost.localhost"
const isLocalhost = window.location.hostname === 'localhost'
const computedBaseURL = isLocalhost
  ? `http://localhost.localhost/api` // your requested behavior
  : `http://${subdomain}localhost/api`

const token = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content')

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
if (token) axios.defaults.headers.common['X-CSRF-TOKEN'] = token

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || computedBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const auth = useAuthStore()
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
