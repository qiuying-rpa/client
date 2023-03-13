<template>
  <dropdown-menu v-model="variableDropdown" :items="variableCandidates"
    @update:selected="$event !== props.modelValue && updateModelValue($event)" implicit>
    <template #activator="{ attrs }">
      <plain-value v-bind="attrs" placeholder="某值" :modelValue="props.modelValue"
        @update:modelValue="updateModelValue" :class="inputColor" />
    </template>
  </dropdown-menu>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useVariablesStore } from '@/store/designer'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const inputColor = ref('bg-blue-100 c-blue-400')
const variableDropdown = ref(false)
const { variables } = storeToRefs(useVariablesStore())

const variableCandidates = computed(() => variables.value.foo?.filter(v => v.startsWith(props.modelValue || '')).map(v => ({ title: v, value: v })) || [])

onMounted(() => {
  analyzeInputType(props.modelValue)
})

function analyzeInputType (input: string) {
  let type = 'any'
  if (input?.match(/^".*?"$/)) {
    type = 'bg-emerald-100 c-emerald-400'
  } else if (variableCandidates.value.some(v => v.value === input)) {
    type = 'bg-red-100 c-red-400'
  } else if (input?.match(/^\d+$/)) {
    type = 'bg-orange-100 c-orange-400'
  }
  inputColor.value = type
}

function updateModelValue (value: string) {
  analyzeInputType(value)
  emits('update:modelValue', value)
}
</script>
