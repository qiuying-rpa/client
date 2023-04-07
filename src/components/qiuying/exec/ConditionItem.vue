<template>
  <div class="flex items-center">
    <i class="inline-block i-mdi-circle-medium mr-2 text-lg" />
    <uncertain-value :modelValue="modelValue.left"
      @update:modelValue="emits('update:modelValue', { ...modelValue, left: $event })" />
    <q-select :items="middleOptions" class="mx-1" :modelValue="modelValue.middle"
      @update:modelValue="emits('update:modelValue', { ...modelValue, middle: $event })" />
    <uncertain-value :modelValue="modelValue.right"
      @update:modelValue="emits('update:modelValue', { ...modelValue, right: $event })"
      v-if="modelValue.middle !== 'truthy' && modelValue.middle !== 'falsy'" />
    <icon-button icon="i-mdi-plus" class="ml-2" v-if="$attrs.onAdd" @click="$attrs.onAdd" />
    <icon-button icon="i-mdi-minus" class="ml-2" v-if="$attrs.onRemove" @click="$attrs.onRemove" />
  </div>
</template>

<script setup lang="ts">
const middleOptions = {
  'no-title': [
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
    }
  ],
  数值: [
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
    }
  ],
  文本: [
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
}

export interface Props {
  modelValue: ConditionItem
}

defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
</script>
