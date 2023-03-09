<template>
  <div class="relative overflow-visible" ref="containerRef">
    <slot name="activator" :attrs="{ onClick: toggleMenu }">
      <div @click.stop="toggleMenu" />
    </slot>
    <div
      class="pa-1 bg-white shadow rd-1 z-1024 absolute top-5 translate-y-2 left-50% translate-x--50%"
      v-if="props.modelValue">
      <template v-if="props.items instanceof Array">
        <div v-if="props.items?.length">
          <div
            :class="(props.selected === i.value ? ['bg-#dbeafe', 'hover-bg-#dbeafe', 'fw-550'] : ['hover-bg-#f4f4f5']).concat(idx > 0 ? 'mt-1' : '').concat(itemClasses)"
            v-for="(i, idx) in props.items" :key="idx" @click="onSelect(i.value)">
            {{ i.title }}
          </div>
        </div>
        <div v-else class="whitespace-nowrap text-xs select-none">
          No Data
        </div>
      </template>
      <template v-else>
        <template v-for="[title, items], index in Object.entries(props.items)" :key="index">
          <q-divider :class="{ 'mt-1': index > 0 }" class="mb-1 whitespace-nowrap select-none"
            v-if="title !== 'no-title'">
            <div class="px-1  c-gray-400 scale-82 origin-center ">
              {{ title }}
            </div>
          </q-divider>
          <div
            :class="(props.selected === i.value ? ['bg-#dbeafe', 'hover-bg-#dbeafe', 'fw-550'] : ['hover-bg-#f4f4f5']).concat(idx > 0 ? 'mt-1' : '').concat(itemClasses)"
            v-for="(i, idx) in items" :key="idx" @click="onSelect(i.value)">
            {{ i.title }}
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'

interface Props {
  modelValue: boolean
  items: SimpleItem[] | { [key: string]: SimpleItem[] }
  selected: ValueType
}

const itemClasses = 'whitespace-nowrap px-2 cursor-pointer c-gray-600 rd-1 select-none'
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
