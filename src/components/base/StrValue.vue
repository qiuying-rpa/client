<template>
  <div class="inline-block py-0.5 px-1 rd-1 bg-#ffedd5 c-#fdba74 fw-550 str-value">
    <div contenteditable @input="onInput" :placeholder="props.placeholder" ref="inputRef"
      class="inline-block b-none outline-none" @keydown.delete="onDelete" />
  </div>
</template>

<style scoped>
div[contenteditable]:empty::before {
  content: attr(placeholder);
  cursor: text;
}

div.str-value::before,
div.str-value::after {
  content: '"';
}
</style>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'

interface Props {
  placeholder?: string
  modelValue: string
}

const emits = defineEmits(['update:modelValue', 'degenerate'])
const props = withDefaults(defineProps<Props>(), {
  placeholder: '某文本',
  modelValue: ''
})

const inputRef: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  inputRef.value!.focus()

  if (props.modelValue) {
    inputRef.value!.insertAdjacentText('afterbegin', props.modelValue)

    const range = getSelection()
    range?.selectAllChildren(inputRef.value!)
    range?.collapseToEnd()
  }
})

function onInput () {
  emits('update:modelValue', inputRef.value?.innerText || '')
}

function onDelete () {
  if (!props.modelValue) {
    emits('degenerate')
  }
}
</script>
