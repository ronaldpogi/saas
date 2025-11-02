export default [
  {
    path: '',
    name: 'Authentication',
    component: () => import('@/modules/auth/views/AuthView.vue'),
    meta: {
      title: 'Authentication - Login | Register Here',
      description: 'Authentication View'
    }
  }
]
