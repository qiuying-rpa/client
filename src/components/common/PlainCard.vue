<template>
  <div class="flex items-center text-sm pa-4 rd-2 w-fit relative"
    :class="[(dashed !== undefined && dashed !== false) ? 'b-1 b-dashed b-gray-400 box-border' : '', (transparent !== undefined && transparent !== false) ? 'bg-transparent' : 'bg-white']"
    @mouseover="$attrs.onRemove && showButton()" @mouseout="delayHideButton">
    <slot></slot>
    <div class="rd-50% absolute top--1.5 right--1.5 bg-gray-3" v-if="removeButton"
      @mouseover="showButton">
      <icon-button icon="i-mdi-close text-xs" @click="$attrs.onRemove" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  dashed: any,
  transparent: any,
}

defineProps<Props>()

const removeButton = ref(false)
const hideButtonTimerHandle = ref<NodeJS.Timeout | null>(null)

function showButton () {
  if (hideButtonTimerHandle.value) {
    clearTimeout(hideButtonTimerHandle.value)
    hideButtonTimerHandle.value = null
  }
  removeButton.value = true
}

function delayHideButton () {
  hideButtonTimerHandle.value = setTimeout(() => {
    hideButtonTimerHandle.value = null
    removeButton.value = false
  }, 120)
}
</script>
