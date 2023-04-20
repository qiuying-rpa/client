<template>
  <plain-card class="select-none relative flex items-center">
    <div>
      {{ title }}
    </div>
    <dot-form class="ml-1">
      <kwargs-form v-model="modelValue" />
    </dot-form>
  </plain-card>
</template>
3
<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  modelValue: KwargsFormModelValue[]
  title: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const modelValue = computed({
  set: (modelValue) => emits('update:modelValue', modelValue),
  get: () => props.modelValue
})
</script>
