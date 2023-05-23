<template>
  <div class="fixed top-4 left-50% translate-x--50% z-99999">
    <notification v-for="notification, index in notifications" :key="notification.symbol"
      :class="{ 'mt-2': index > 0 }" v-bind="notification" />
  </div>
</template>

<script setup lang="ts">
import Notification from './Notification.vue'
import { useNotifierStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const { notifications } = storeToRefs(useNotifierStore())
</script>
