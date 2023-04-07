// Composables
import { getPermissions } from '@/api/auth'
import { useAppStore, useNotifierStore } from '@/store/app'
import { getAccessToken, removeToken } from '@/utils/auth'
import { decodeJwt } from '@/utils/encrypt'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Barren',
    component: () => import('@/layouts/Barren.vue'),
    children: [
      {
        path: '',
        name: 'Loading',
        component: () => import('@/views/Loading.vue')
      },
      {
        path: 'sign-in',
        name: 'Sign In',
        component: () => import('@/views/SignIn.vue')
      },
    ]
  },
  {
    path: '/',
    name: 'Side Navigation',
    component: () => import('@/layouts/SideNav.vue'),
    children: [
      {
        path: 'designer',
        name: 'Process Designer',
        component: () => import('@/views/Designer.vue')
      },
    ]
  },
  {
    path: '/processes',
    name: 'Processes',
    component: () => import('@/views/Processes.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

async function initUser(token: string) {
  const { userInfo, setUserInfo, setMenus, setActions } = useAppStore()
  if (!userInfo && token) {
    const info = decodeJwt(token)
    const response = await getPermissions()
    const { actions, menus } = response.data
    if (menus.length > 0) {
      setUserInfo(info)
      setMenus(menus)
      setActions(actions || [])
    } else {
      const { pushNotification } = useNotifierStore();
      pushNotification('No authorized menus found.', 'error')
      removeToken();
      return false;
    }
  }
  return true
}

const fastPass = ['/']
const signPath = ['/sign-in', '/sign-up']

router.beforeEach(async (to, _, next) => {
  if (fastPass.includes(to.path)) {
    next()
  } else {
    const accessToken = getAccessToken()
    if (accessToken) {
      const error = await initUser(accessToken);
      const { menus } = useAppStore();

      if (!error && menus.some(m => m.path === to.path) && !signPath.includes(to.path)) {
        next()
      } else {
        next({ path: '/', replace: true })
      }
    } else {
      if (!signPath.includes(to.path)) {
        next({ path: '/', replace: true })
      } else {
        next()
      }
    }
  }

})

export default router
