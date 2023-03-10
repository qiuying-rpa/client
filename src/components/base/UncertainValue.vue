<template>
  <dropdown-menu v-model="typeDropdown" :items="uncertainTypes" v-model:selected="selectedVariable">
    <template #activator="{ attrs }">
      <plain-value v-bind="attrs" placeholder="某值" :modelValue="props.modelValue"
        @update:modelValue="updateModelValue" :class="inputColor" />
    </template>
  </dropdown-menu>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const inputColor = ref('bg-blue-100 c-blue-400')
const selectedVariable = ref('')
const typeDropdown = ref(false)
const uncertainTypes = ref([
  {
    title: '文本',
    value: 'str-value'
  },
  {
    title: '...',
    value: 'plain-value'
  }
])

onMounted(() => {
  analyzeInputType(props.modelValue)
})

function analyzeInputType (input: string) {
  let type = 'any'
  if (input?.match(/^".*?"$/)) {
    type = 'bg-c-emerald-100 c-emerald-400'
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
