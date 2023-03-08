<template>
  <div class="relative overflow-visible" ref="containerRef">
    <slot name="activator" :attrs="{ onClick: toggleMenu }">
      <div @click.stop="toggleMenu" />
    </slot>
    <div
      class="pa-2 bg-white shadow rd-1 z-1024 absolute top-5 translate-y-2 left-50% translate-x--50%"
      v-if="props.modelValue">
      <div v-if="props.items?.length">
        <div class="whitespace-nowrap px-2 cursor-pointer c-gray-600 rd-1 select-none"
          :class="(props.selected === i.value ? ['bg-#dbeafe', 'hover-bg-#dbeafe', 'fw-550'] : ['hover-bg-#f4f4f5']).concat([idx > 0 ? 'mt-1' : ''])"
          v-for="(i, idx) in props.items" :key="idx" @click="onSelect(i.value)">
          {{ i.title }}
        </div>
      </div>
      <div v-else class="whitespace-nowrap text-xs select-none">
        No Data
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'

interface Props {
  modelValue: boolean
  items: SimpleItem[]
  selected: ValueType
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'update:selected'])

const containerRef = ref(null)

onMounted(() => {
  onClickOutside(
    containerRef,
    () => props.modelValue && emits('update:modelValue', false)
  )
})

function toggleMenu () {
  emits('update:modelValue', !props.modelValue)
}

function onSelect (val: ValueType) {
  emits('update:selected', val)

  toggleMenu()
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all .2s cubic-bezier(.4, 0, .2, 1);
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
  opacity: 0;
}

.v-enter-from div,
.v-leave-to div {
  opacity: .37;
}
</style>
