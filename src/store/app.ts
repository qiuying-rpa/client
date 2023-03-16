import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useNotifierStore = defineStore('notifier', () => {
  const notifications: QNotification[] = reactive([])

  function pushNotification (content: string, type: NotificationType) {
    notifications.push({
      type,
      content
    })
  }

  function shiftNotification () {
    notifications.shift()
  }

  return { notifications, pushNotification, shiftNotification }
})