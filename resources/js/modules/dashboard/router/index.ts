export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/modules/dashboard/views/DashboardView.vue'),
    meta: {
      layout: 'default',
      title: 'Dashboard - Dashboard View',
      description: 'Dashboard View'
    }
  }
]
