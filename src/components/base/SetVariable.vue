<template>
  <plain-card class="select-none">
    将
    <plain-value v-model="variable" placeholder="变量名" class="mx-0.5 bg-red-100 c-red-400" />
    赋值为
    <uncertain-value class="mx-0.5" v-model="variableValue" />
  </plain-card>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useVariablesStore } from '@/store/designer'

interface Props {
  modelValue?: {
    variable: string
    variableValue: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    variable: '',
    variableValue: ''
  })
})
const emits = defineEmits(['update:modelValue'])

const variable = computed({
  set: (variable) => emits('update:modelValue', { ...props.modelValue, variable }),
  get: () => props.modelValue.variable
})
const variableValue = computed({
  set: (variableValue) => emits('update:modelValue', { ...props.modelValue, variableValue }),
  get: () => props.modelValue.variableValue
})

const { setVariable, unsetVariable } = useVariablesStore()

watch(variable, (val, oldVal) => {
  unsetVariable('foo', oldVal)
  setVariable('foo', val)
})
</script>
