<template>
  <Transition enter-active-class="animate__animated animate__fadeInDown flash-enter"
    leave-active-class="animate__animated animate__fadeOutUp flash-leave"
    @afterLeave="shiftNotification">
    <div class="px-2 py-1.5 rd-1.5 bg-white flex items-center shadow" v-if="visible"
      @mouseover="onOver" @mouseout="onOut">
      <v-progress-circular color="secondary" size="16" width="2" indeterminate class="mr-1"
        v-if="type === 'loading'" />
      <v-icon class="block mr-1 c-green-500" v-else-if="type === 'success'"
        size="16">mdi-check-circle</v-icon>
      <v-icon class="block mr-1 c-blue-500" v-else-if="type === 'info'"
        size="16">mdi-information</v-icon>
      <v-icon class="block mr-1 c-red-500" v-else-if="type === 'error'" size="14">mdi-alert</v-icon>
      <v-icon class="block mr-1 c-yellow-500" v-else-if="type === 'warn'"
        size="16">mdi-alert-circle</v-icon>
      <div class="c-gray-800 text-sm max-w-100">{{ content }}</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNotifierStore } from '@/store/app'
import { Fn, useTimeoutFn } from '@vueuse/core'

export interface Props {
  type: NotificationType
  content: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), { duration: 2000 })
const { shiftNotification } = useNotifierStore()

let stopAutoDismiss: Fn | null = null

const visible = ref(false)

onMounted(() => {
  visible.value = true
  autoDismiss()
})

function autoDismiss() {
  const { stop } = useTimeoutFn(() => {
    visible.value = false
  }, props.duration)
  stopAutoDismiss = stop
}

function onOver() {
  stopAutoDismiss?.()
}

function onOut() {
  autoDismiss()
}
</script>

<style scoped>
.flash-enter {
  --animate-duration: 0.12s;
}

.flash-leave {
  --animate-duration: 0.37s;
}
</style>
