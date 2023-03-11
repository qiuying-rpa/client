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
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDesignerStore } from '@/store/designer'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const inputColor = ref('bg-blue-100 c-blue-400')
const variableDropdown = ref(false)
const variableCandidates = ref<SimpleItem[]>([])
const { variables } = storeToRefs(useDesignerStore())

onMounted(() => {
  analyzeInputType(props.modelValue)
})

watch(variableDropdown, (val) => {
  if (val) {
    updateVariableCandidates('')
  }
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

function updateVariableCandidates (value: string) {
  variableCandidates.value = variables.value.foo?.filter(v => v.startsWith(value || '')).map(v => ({ title: v, value: v })) || []
}

function updateModelValue (value: string) {
  analyzeInputType(value)
  updateVariableCandidates(value)
  emits('update:modelValue', value)
}
</script>
