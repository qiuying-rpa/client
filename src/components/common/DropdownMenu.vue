<template>
    <div class="relative overflow-visible">
        <slot name="activator" :attrs="{onClick}">
            <div @click.stop="onClick" />
        </slot>

        <div v-if="props.modelValue" ref="containerRef" class="z-1024 absolute top-110% left-50% translate-x--50%" >
            <div class="flex-column items-center justify-center pa-2 bg-white shadow rd-1">
                <template v-if="props.items?.length">
                    <div
                        class="whitespace-nowrap hover-bg-#f4f4f5 px-2 cursor-pointer c-#64748b rd-1"
                        v-for="i, idx in props.items"
                        :key="idx"
                        @click="emits('update:selected', i.value)"
                    >{{ i.title }}</div>
                </template>
                <div v-else class="whitespace-nowrap text-xs">
                    No Data
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'

interface propType {
  modelValue: boolean
  items: {
    title: string
    value: string
  }[]
}

const props = defineProps<propType>()
const emits = defineEmits(['update:modelValue', 'update:selected'])

const containerRef = ref(null)

onMounted(() => {
  onClickOutside(containerRef, () => props.modelValue && emits('update:modelValue', false))
})

function onClick () {
  if (!props.modelValue) {
    emits('update:modelValue', true)
  }
}
</script>
