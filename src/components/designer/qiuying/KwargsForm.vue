<template>
  <div class="flex flex-col">
    <template v-for="item, index in props.modelValue" :key="index + refreshKey">
      <div v-if="Object.prototype.toString.call(item) === '[object Object]'"
        class="flex items-center min-h-7.5">
        <i class="inline-block text-lg mr-1 i-mdi-circle-medium"
          v-if="!(props.inside || props.inside === '')" />
        <span class="text-sm mx-1 whitespace-nowrap">{{ (item as KwargsFormModelValue).label
        }}</span>
        <template v-if="Array.isArray(item)">
          <kwargs-form inside class="mt-2 b-l-1 b-l-gray-3 b-l-solid ml-2 rd-12px pl-2"
            :modelValue="item" @update:modelValue="updateModelValue(index, $event)" />
        </template>
        <template v-else>
          <kwargs-form v-if="Array.isArray(item.value)" inside
            :modelValue="item.value as KwargsFormModelValue[]"
            class="b-l-1 b-l-gray-3 b-l-solid rd-12px pl-2" :class="{ 'mt-2': index > 0 }"
            @update:modelValue="updateModelValue(index, { ...item, value: $event })" />
          <v-select v-else-if="(item as KwargsFormModelValue).options" density="compact"
            variant="outlined" :items="(item as KwargsFormModelValue).options" hide-details
            :modelValue="(item as KwargsFormModelValue).value || undefined" placeholder="请选择"
            @update:modelValue="updateModelValue(index, { ...item, value: $event })"
            class="grow-0 min-w-6.5rem" />
          <plain-value v-else :modelValue="(item as KwargsFormModelValue).value"
            @update:modelValue="updateModelValue(index, { ...item, value: $event })" />
        </template>
      </div>
      <div v-else class="flex items-center" :class="{ 'mt-2': index > 0 }">
        <kwargs-form inside :modelValue="item as KwargsFormModelValue[]"
          class="b-l-1 b-l-gray-3 b-l-solid rd-12px pl-2"
          @update:modelValue="updateModelValue(index, $event)" />
        <div class="ml-2">
          <v-btn icon="mdi-plus" @click="addHandler" v-if="index === 0" size="x-small" flat />
          <v-btn icon="mdi-minus" @click="removeHandler(index)" v-else size="x-small" flat />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { deepCopy } from '@/utils/common'
import { ref, toRaw } from 'vue'

export interface Props {
  modelValue?: KwargsFormModelValue[] | KwargsFormModelValue[][]
  inside?: any
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const blankItem = toRaw((props?.modelValue as KwargsFormModelValue[])[0])
const refreshKey = ref(new Date().getTime())

function updateModelValue(index: number, modelValue: KwargsFormModelValue | KwargsFormModelValue[]) {
  const modelValueNew = deepCopy(props.modelValue)
  modelValueNew[index] = modelValue
  emits('update:modelValue', modelValueNew)
}

function addHandler() {
  emits('update:modelValue', (props.modelValue as KwargsFormModelValue[]).concat([blankItem]))
}

function removeHandler(index: number) {
  const modelValueNew = deepCopy(props.modelValue)
  modelValueNew.splice(index, 1)
  emits('update:modelValue', modelValueNew)
  refreshKey.value = new Date().getTime()
}
</script>
