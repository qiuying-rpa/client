<template>
  <div class="flex items-center">
    <i class="inline-block i-mdi-circle-medium mr-2 text-lg" />

    <plain-value :modelValue="modelValue.left"
      @update:modelValue="emits('update:modelValue', { ...modelValue, left: $event })" />

    <v-select variant="outlined" :items="middleOptions" density="compact" class="mx-1 min-w-6.5rem"
      placeholder="请选择" hide-details :modelValue="modelValue.middle || null"
      @update:modelValue="emits('update:modelValue', { ...modelValue, middle: $event })" />

    <plain-value :modelValue="modelValue.right"
      @update:modelValue="emits('update:modelValue', { ...modelValue, right: $event })"
      v-if="modelValue.middle !== 'truthy' && modelValue.middle !== 'falsy'" />

    <v-btn icon="mdi-plus" class="ml-2" v-if="$attrs.onAdd" @click="$attrs.onAdd" size="x-small"
      flat />
    <v-btn icon="mdi-minus" class="ml-2" v-if="$attrs.onRemove" @click="$attrs.onRemove"
      size="x-small" flat />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  modelValue: ConditionItem
}

const middleOptions = [
  {
    title: '无意义',
    value: 'falsy'
  },
  {
    title: '有意义',
    value: 'truthy'
  },
  {
    title: '等于',
    value: '=='
  },
  {
    title: '不等于',
    value: '!='
  },
  {
    title: '大于',
    value: '>'
  },
  {
    title: '小于',
    value: '<'
  },
  {
    title: '大于等于',
    value: '>='
  },
  {
    title: '小于等于',
    value: '<='
  },
  {
    title: '包含',
    value: 'in'
  },
  {
    title: '不包含',
    value: 'notin'
  },
  {
    title: '开头为',
    value: 'startswith'
  },
  {
    title: '结尾为',
    value: 'endswith'
  }
]

defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
</script>
