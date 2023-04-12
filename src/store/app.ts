// Utilities
import { uuid } from '@/utils/common'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

interface UserInfo {
  id: string
  name: string
}

type ErrorValue = 404 | 403 | null
type LoadingValue = number | null


export const useAppStore = defineStore('app', () => {
  const menus = ref<string[]>([])
  const actions = ref<PermissionValue>([])
  const userInfo = ref<UserInfo | null>(null)
  const error = ref<ErrorValue>(null)
  const loading = ref<LoadingValue>(null)

  function setMenus(_menus: string[]) {
    menus.value = _menus
  }

  function setActions(_actions: PermissionValue) {
    actions.value = _actions
  }

  function setUserInfo(info: UserInfo) {
    userInfo.value = info
  }

  function setError(_error: ErrorValue) {
    error.value = _error
  }

  function setLoading(_loading: LoadingValue) {
    loading.value = _loading
  }

  return { menus, actions, userInfo, error, loading, setMenus, setActions, setUserInfo, setError, setLoading }
})

export const useNotifierStore = defineStore('notifier', () => {
  const notifications: QNotification[] = reactive([])

  function pushNotification(content: string, type: NotificationType, duration = 2000) {
    notifications.push({
      symbol: uuid(),
      type,
      content,
      duration
    })
  }

  function shiftNotification() {
    notifications.shift()
  }

  return { notifications, pushNotification, shiftNotification }
})
