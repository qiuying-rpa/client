// Utilities
import { uuid } from '@/utils/common'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

interface Menu {
  icon: string
  title: string
  path: string
}

interface UserInfo {
  id: string
  name: string
}

export const useAppStore = defineStore('app', () => {
  const menus = ref<Menu[]>([])
  const actions = ref<string[]>([])
  const userInfo = ref<UserInfo | null>(null)

  function setMenus(_menus: Menu[]) {
    menus.value = _menus
  }

  function setActions(_actions: string[]) {
    actions.value = _actions
  }

  function setUserInfo(info: UserInfo) {
    userInfo.value = info
  }

  return { menus, actions, userInfo, setMenus, setActions, setUserInfo }
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
