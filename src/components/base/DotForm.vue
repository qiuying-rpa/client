<template>
  <div class="relative overflow-visible" ref="containerRef">
    <slot name="activator" :attrs="{ onClick: toggleOverlay }">
      <div @click.stop.capture="toggleOverlay">
        <icon-button :icon="`${overlay ? 'i-mdi-circle-outline' : 'i-mdi-circle'} text-xs`" />
      </div>
    </slot>
    <div
      class="pa-3 bg-white shadow rd-2 z-1024 absolute top-50% translate-y--50% left-100% translate-x-5px"
      v-if="overlay">
      <slot>
        <div class="flex items-center">
          <div class="flex flex-col shrink-0">
            <div class="justify-end text-xs h-7.5 flex items-center">
              <span class="c-red">*</span>
              <span class="mr-2">Name:</span>
            </div>
            <div class="justify-end text-xs h-7.5 flex items-center">
              <span class="c-red">*</span>
              <span class="mr-2">Age:</span>
            </div>
          </div>
          <div>
            <div class="h-7.5 flex items-center">
              <plain-value />
            </div>
            <div class="h-7.5 flex items-center">
              <plain-value />
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const overlay = ref(false)
const containerRef = ref(null)

onClickOutside(containerRef, () => {
  overlay.value && (overlay.value = false)
})

function toggleOverlay () {
  overlay.value = !overlay.value
}
</script>
