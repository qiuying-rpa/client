<template>
  <dropdown-menu v-model="dropdown" :items="props.items"
    @update:selected="emits('update:modelValue', $event)" :selected="props.modelValue">
    <template #activator="{ attrs }">
      <div v-bind="attrs"
        class="whitespace-nowrap cursor-pointer c-gray-600 b-1 b-solid b-gray-2 px-1 py-.5 rd-1.5 flex items-center select-none">
        {{ getItemsArray().find(i => i.value === props.modelValue)?.title || props.placeholder }}
        <i class="inline-block" :class="[dropdown ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down']" />
      </div>
    </template>
  </dropdown-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type TitledItems = { [key: string]: SimpleItem[] }

interface Props {
  modelValue: string
  items: SimpleItem[] | TitledItems
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择'
})
const emits = defineEmits(['update:modelValue'])

const dropdown = ref(false)

function getItemsArray () {
  return (props.items instanceof Array) ? props.items : Object.entries(props.items).reduce((pre, [, curr]) => pre.concat(curr as []), [])
}
</script>
