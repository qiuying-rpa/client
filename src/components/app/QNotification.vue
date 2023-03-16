<template>
  <div class="px-2 py-1.5 rd-2 bg-white flex items-center shadow transition">
    <i class="block mr-1" :class="{
      'c-green-500 i-mdi-check-circle': type === 'success',
      'c-blue-500 i-mdi-information': type === 'info',
      'c-red-500 i-mdi-alert': type === 'error',
      'c-yellow-500 i-mdi-alert-circle': type === 'warn',
    }"></i>
    <div class="c-gray-800 text-sm">{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNotifierStore } from '@/store/app'

interface Props {
  type: NotificationType
  content: string
}

defineProps<Props>()
const { shiftNotification } = useNotifierStore()

onMounted(() => {
  setTimeout(() => {
    shiftNotification()
  }, 2000)
})
</script>
