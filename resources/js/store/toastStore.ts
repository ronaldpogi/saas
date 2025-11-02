import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toastStore', () => {
  const alerts = ref<{ id: number; type: string; title: string; message: string }[]>([])

  const addAlert = (type: string, title: string, message: string) => {
    const id = Date.now()
    alerts.value.push({ id, type, title, message })

    // Auto remove after 3 seconds
    setTimeout(() => {
      alerts.value = alerts.value.filter((a) => a.id !== id)
    }, 2000)
  }

  return { alerts, addAlert }
})
