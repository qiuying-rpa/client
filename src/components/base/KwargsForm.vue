<template>
  <div class="flex flex-col">
    <template v-for="item, index in props.modelValue" :key="index">
      <div v-if="Object.prototype.toString.call(item) === '[object Object]'"
        class="flex items-center min-h-7.5">
        <i class="inline-block text-lg mr-1 i-mdi-circle-medium"
          v-if="!(props.inside || props.inside === '')" />
        <span class="text-xs mx-1 whitespace-nowrap">{{ (item as KwargsFormModelValue).label }}</span>
        <template v-if="Array.isArray(item)">
          <kwargs-form inside class="mt-2 b-l-1 b-l-gray-3 b-l-solid ml-2 rd-12px pl-2"
            :modelValue="item" @update:modelValue="updateModelValue(index, $event)" />
        </template>
        <template v-else>
          <q-select v-if="(item as KwargsFormModelValue).options"
            :items="(item as KwargsFormModelValue).options"
            :modelValue="(item as KwargsFormModelValue).value"
            @update:modelValue="updateModelValue(index, { ...item, value: $event })" />
          <uncertain-value v-else :modelValue="(item as KwargsFormModelValue).value"
            @update:modelValue="updateModelValue(index, { ...item, value: $event })" />
        </template>
      </div>
      <div v-else class="flex items-center" :class="{ 'mt-2': index > 0 }">
        <kwargs-form inside :modelValue="item as KwargsFormModelValue[]"
          class="b-l-1 b-l-gray-3 b-l-solid rd-12px pl-2"
          @update:modelValue="updateModelValue(index, $event)" />
        <icon-button :icon="index > 0 ? 'i-mdi-minus' : 'i-mdi-plus'" class="ml-2" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { deepCopy } from '@/utils/common'

interface Props {
  modelValue?: KwargsFormModelValue[] | KwargsFormModelValue[][]
  inside?: any
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

function updateModelValue (index: number, modelValue: KwargsFormModelValue | KwargsFormModelValue[]) {
  const modelValueNew = deepCopy(props.modelValue)
  modelValueNew[index] = modelValue
  emits('update:modelValue', modelValueNew)
}
</script>
