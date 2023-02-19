<template>
    <dropdown-menu
      v-model="typeDropdown"
      :items="uncertainTypes"
      v-model:selected="inputType"
      v-if="!inputType"
    >
        <template #activator="{attrs}">
            <plain-value placeholder="某值" v-model="modelValue" v-bind="attrs"/>
        </template>
    </dropdown-menu>
    <component :is="inputType" v-else v-model="modelValue" @degenerate="degenerate"/>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const modelValue = ref('')
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

watch(modelValue, (val) => {
  if (val === '"') {
    inputType.value = 'str-value'
    modelValue.value = ''
  } else if (!!val && !inputType.value) {
    inputType.value = 'plain-value'
  }
})

function degenerate () {
  inputType.value = ''
}
</script>
