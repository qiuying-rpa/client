<template>
  <div
    class="bg-blue-100 c-blue-400 whitespace-nowrap inline-block b-none outline-none py-0.5 px-1 rd-1 fw-550 plain-value"
    contenteditable @input="onInput" :placeholder="props.placeholder" ref="inputRef" />
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'

interface Props {
  placeholder?: string
  modelValue: string
}

const emits = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
  placeholder: '某值',
  modelValue: ''
})

const inputRef: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  if (props.modelValue) {
    inputRef.value!.focus()
    inputRef.value!.insertAdjacentText('afterbegin', props.modelValue)

    const range = getSelection()
    range?.selectAllChildren(inputRef.value!)
    range?.collapseToEnd()

    inputRef.value!.blur()
  }
})

function onInput () {
  emits('update:modelValue', inputRef.value?.innerText || '')
}
</script>

<style scoped>
div[contenteditable]:empty::before {
  content: attr(placeholder);
  cursor: text;
}
</style>
