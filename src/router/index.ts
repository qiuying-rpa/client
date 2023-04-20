// Composables
import { getPermissions } from '@/models/auth'
import { useAppStore, useNotifierStore } from '@/store/app'
import { getAccessToken, removeToken } from '@/utils/auth'
import { decodeJwt } from '@/utils/encrypt'
import { useTitle } from '@vueuse/core'
import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Barren',
    component: () => import('@/layouts/Barren.vue'),
    meta: {
      tags: ['layout']
    },
    children: [
      {
        path: 'sign-in',
        name: '登录',
        component: () => import('@/views/SignIn.vue'),
        meta: {
          tags: ['no-auth']
        }
      },
      {
        path: 'sign-up',
        name: '注册',
        component: () => import('@/views/SignUp.vue'),
        meta: {
          tags: ['no-auth']
        }
      },
      {
        path: 'forget-password',
        name: '忘记密码',
        component: () => import('@/views/ForgetPassword.vue'),
        meta: {
          tags: ['no-auth']
        }
      },
      {
        path: 'settings',
        name: '设置',
        component: () => import('@/layouts/Settings.vue'),
        children: [
          {
            path: 'account',
            name: '账号设置',
            component: () => import('@/views/settings/Account.vue'),
            meta: {
              icon: 'mdi-account-cog-outline',
              order: 20,
              tags: ['menu']
            }
          },
          {
            path: 'appearance',
            name: '外观',
            component: () => import('@/views/settings/Appearance.vue'),
            meta: {
              icon: 'mdi-palette-outline',
              order: 21,
              tags: ['menu']
            }
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'Side Navigation',
    meta: {
      tags: ['layout']
    },
    component: () => import('@/layouts/SideNav.vue'),
    children: [
      {
        path: 'system',
        name: '系统管理',
        meta: {
          icon: 'mdi-cog-outline',
          order: 3,
          tags: ['nav']
        },
        component: () => import('@/layouts/System.vue'),
        children: [
          {
            path: 'users',
            name: '用户管理',
            component: () => import('@/views/system/Users.vue'),
            meta: {
              icon: 'mdi-account-outline',
              order: 10,
              tags: ['menu']
            }
          },
          {
            path: 'roles',
            name: '角色管理',
            component: () => import('@/views/system/Roles.vue'),
            meta: {
              icon: 'mdi-account-key-outline',
              order: 11,
              tags: ['menu']
            }
          }
        ]
      },
      {
        path: 'designer',
        name: '设计器',
        component: () => import('@/views/Designer.vue'),
        meta: {
          icon: 'mdi-robot-industrial-outline',
          order: 0,
          tags: ['menu', 'nav']
        }
      }, {
        path: 'processes',
        name: '流程管理',
        component: () => import('@/views/Processes.vue'),
        meta: {
          icon: 'mdi-robot-outline',
          order: 1,
          tags: ['menu', 'nav'],
          actions: [
            {
              title: '新建流程',
              value: 'process:create'
            },
            {
              title: '编辑流程',
              value: 'process:update'
            },
            {
              title: '删除流程',
              value: 'process:delete'
            }
          ]
        }
      }
    ]
  },
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

    // validate & sort
    const sortedMenus = router.getRoutes().filter(r => menus === '*' || checkAuthorized(r.path, menus)).sort((a, b) => (typeof a.meta.order === 'number' ? a.meta.order : Infinity) - (typeof b.meta.order === 'number' ? b.meta.order : Infinity)).map(r => r.path)

    setUserInfo(info)
    setMenus(sortedMenus || [])
    setActions(actions || [])
  }
}

function checkAuthorized(certain: string, authorized: string[]) {
  if (authorized.includes(certain)) {
    return true
  } else {
    const dynamicPath = authorized.filter(a => a.match(/\/:.*?/))
    if (dynamicPath.length) {
      const certainArr = certain.split('/')
      return dynamicPath.some(d => d.split('/').every((_d, idx) => _d.startsWith(':') || _d === certainArr[idx]))
    }
  }
  return false
}

router.beforeEach(async (to) => {
  const { setError, setLoading } = useAppStore()

  if (!to.matched.length) {
    setError(404)
  } else {
    setLoading(0)
    useTitle('Loading.. | 秋英 RPA')

    if (to.meta.tag !== 'public') {
      const accessToken = getAccessToken()
      if (accessToken) {
        await initUser(accessToken)
        const { menus } = useAppStore()

        if (menus.length) {
          if (to.path === '/' || ((to.meta.tags as string[]) || []).includes('no-auth')) {
            return { path: menus[0], replace: true }
          } else if (!checkAuthorized(to.path, menus)) {
            setError(403)
            return { path: '/sign-in', replace: true }
          }
        } else {
          const { pushNotification } = useNotifierStore()
          removeToken()
          pushNotification('No accessible menu found.', 'error')
          if (to.path !== '/sign-in') {
            return { path: '/sign-in', replace: true }
          }
        }
      } else {
        if (!(to.meta.tags as string[] || []).includes('no-auth')) {
          return { path: '/sign-in', replace: true }
        }
      }
    }
  }
})

router.afterEach((to) => {
  const { loading, setLoading } = useAppStore()
  if (loading) {
    setLoading(100)
  }
  useTitle(`${to.name as string || ':/'} | 秋英 RPA`)
})

export default router
