import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/designer'
  },
  {
    path: '/designer',
    name: 'Process Designer',
    component: () => import('@/views/DesignerView.vue')
  },
  {
    path: '/processes',
    name: 'Processes',
    component: () => import('@/views/ProcessesView.vue')
  }
]

export default createRouter({
  routes,
  history: createWebHashHistory()
})