import './bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'

import { Icon } from '@iconify/vue'

import EmptyLayout from '@/components/layouts/EmptyLayout.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(router)
app.use(head)

app.component('empty-layout', EmptyLayout)
app.component('default-layout', DefaultLayout)

app.component('Icon', Icon)

app.mount('#app')
