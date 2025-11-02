<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useHead } from '@vueuse/head'

const { currentRoute } = useRouter()

const defaultLayout = 'empty'
const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
)

const defaultTitle = 'Ronald Bibon'
const defaultDescription = 'Default description'

const head = computed(() => {
  const meta = currentRoute.value.meta
  return {
    title: (meta.title as string) || defaultTitle,
    meta: [
      {
        name: 'description',
        content: (meta.description as string) || defaultDescription
      }
    ]
  }
})

useHead(head)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
