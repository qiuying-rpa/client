<template>
  <plain-card class="select-none relative">
    打印
    <uncertain-value class="ml-0.5" v-model="content" />
  </plain-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: {
    content: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    content: ''
  })
})
const emits = defineEmits(['update:modelValue'])

const content = computed({
  set: (content) => emits('update:modelValue', { ...props.modelValue, content }),
  get: () => props.modelValue.content
})
</script>
