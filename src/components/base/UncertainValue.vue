<template>
  <dropdown-menu v-model="typeDropdown" :items="uncertainTypes" v-model:selected="inputType"
    v-if="!inputType">
    <template #activator="{ attrs }">
      <plain-value placeholder="某值" v-bind="attrs" @click.stop :modelValue="props.modelValue"
        @update:modelValue="emits('update:modelValue', $event)" />
    </template>
  </dropdown-menu>
  <component :is="inputType" v-else :modelValue="props.modelValue"
    @update:modelValue="emits('update:modelValue', $event)" @degenerate="degenerate" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const inputType = ref('')
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

watchEffect(() => {
  if (props.modelValue === '"') {
    inputType.value = 'str-value'
    emits('update:modelValue', '')
  } else if (!!props.modelValue && !inputType.value) {
    inputType.value = 'plain-value'
  }
})

function degenerate () {
  inputType.value = ''
}
</script>
