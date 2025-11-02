export default [
  {
    path: '',
    name: 'Login',
    component: () => import('@/modules/auth/views/LoginView.vue'),
    meta: {
      title: 'Login - Login Here',
      description: 'Login View'
    }
  }
]
