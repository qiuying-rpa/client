<template>
  <Transition enter-active-class="animate__animated animate__fadeInDown animate__faster"
    leave-active-class="animate__animated animate__fadeOutUp animate__faster">
    <div class="px-2 py-1.5 rd-2 bg-white flex items-center shadow" v-if="visible">
      <i class="block mr-1" :class="{
        'c-green-500 i-mdi-check-circle': type === 'success',
        'c-blue-500 i-mdi-information': type === 'info',
        'c-red-500 i-mdi-alert': type === 'error',
        'c-yellow-500 i-mdi-alert-circle': type === 'warn',
      }"></i>
      <div class="c-gray-800 text-sm">{{ content }}</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNotifierStore } from '@/store/app'

interface Props {
  type: NotificationType
  content: string
}

defineProps<Props>()
const { shiftNotification } = useNotifierStore()

const visible = ref(false)

onMounted(() => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
    setTimeout(() => {
      shiftNotification()
    }, 2000)
  }, 2000)
})
</script>
