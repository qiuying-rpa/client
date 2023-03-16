<template>
  <div class="fixed top-4 left-50% translate-x--50%  z-2048">
    <q-notification v-for="{ type, content }, index in notifications" :key="content"
      :class="{ 'mt-2': index > 0 }" :type="type" :content="content" />
  </div>
</template>

<script setup lang="ts">
import { useNotifierStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const { notifications } = storeToRefs(useNotifierStore())
</script>
