<template>
  <div
    class="pl-8 relative before-content-none before-w-0.4 before-h-100% before-absolute before-left-0 before-bg-slate w-fit">
    <template v-if="props.modelValue.length">
      <template v-for="{ is, id, modelValue }, index in props.modelValue" :key="index">
        <component :is="is.startsWith('exec') ? 'div' : 'node-shell'" :class="{ 'mt-4': index > 0 }">
          <component :modelValue="modelValue" :is="is" :id="id"
            @update:modelValue="updateNodeModelValue(index, $event)"
            :class="{ 'mt-4': index > 0 && is.startsWith('exec') }" />
        </component>
      </template>
    </template>
    <hint-node v-else />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: ProcessNode[]
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

function updateNodeModelValue (index: number, modelValue: ProcessNodeModelValue) {
  const newModelValue = props.modelValue
  newModelValue[index].modelValue = modelValue
  emits('update:modelValue', newModelValue)
}
</script>
