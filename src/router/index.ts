import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/designer',
    name: 'Process Designer',
    component: () => import('@/views/DesignerView.vue')
  }
]

export default createRouter({
  routes,
  history: createWebHashHistory()
})