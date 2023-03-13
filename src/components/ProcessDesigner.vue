<template>
  <div class="w-100%">
    <exec-sequential v-model="nodes" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import { uuid } from '@/utils/common'

const nodes = ref([
  {
    id: uuid(),
    is: 'set-variable',
    modelValue: {}
  },
  {
    id: uuid(),
    is: 'print-log',
    modelValue: {}
  },
  {
    id: uuid(),
    is: 'exec-conditional',
    modelValue: {}
  },
  {
    id: uuid(),
    is: 'exec-circular',
    modelValue: {}
  }
])
</script>
