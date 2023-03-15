<template>
  <plain-card class="select-none relative flex items-center">
    {{ title }}
    <dot-form class="ml-1">
      <kwargs-form v-model="modelValue" />
    </dot-form>
  </plain-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: KwargsFormModelValue[],
  title: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const modelValue = computed({
  set: (modelValue) => emits('update:modelValue', modelValue),
  get: () => props.modelValue
})
</script>
