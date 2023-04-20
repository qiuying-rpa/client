<template>
  <div class="relative h-100%">
    <div class="overflow-auto flex justify-center pa-4 border-box h-100%">
      <div class="min-w-50% h-fit">
        <exec-sequential v-model="nodes" />
      </div>
    </div>
    <div class="flex items-center absolute top-4 right-4 w-fit bg-white px-2 py-1 rd-12px">
      <v-btn icon="mdi-play c-green-600" @click="run" size="x-small" flat />
      <v-btn icon="mdi-content-save c-blue-600" class="ml-1" @click="save" size="x-small" flat />
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import { useNotifierStore } from '@/store/app'

export interface Props {
  meta: {
    title: string
  }
}

defineProps<Props>()

const { pushNotification } = useNotifierStore()

const nodes = ref<ProcessNode[]>([])

// TODO lose many validation
function genKwargs(modelValue: ProcessNode | ProcessNode[] | ObjectValue | CommonArgItem[] | CommonArgItem[][]): ObjectValue | ObjectValue[] | RunnableNode[] {
  if (Array.isArray(modelValue)) {
    if (Array.isArray(modelValue[0])) {
      return (modelValue as CommonArgItem[][]).reduce<ObjectValue[]>((pre, curr) => pre.concat(genKwargs(curr) as ObjectValue), [])
    } else if ((modelValue as ProcessNode[])[0]?.is) {
      return (modelValue as ProcessNode[]).map(({ id, is, modelValue }) => ({ id, func: is, kwargs: genKwargs(modelValue!) }))
    } else {
      return (modelValue as CommonArgItem[]).reduce<ObjectValue>((pre, curr) => ({
        ...pre,
        [curr.argName]: Array.isArray(curr.value) ? genKwargs(curr.value) : curr.value
      }), {})
    }
  } else {
    return Object.entries(modelValue).reduce((pre, [key, value]) => ({
      ...pre,
      [key]: Array.isArray(value) && (value[0]?.argName || value[0]?.is) ? genKwargs(value) : value
    }), {})
  }
}

function run() {
  const destNodes = {
    processes: [
      {
        name: '主流程',
        method: 'main',
        params: null,
        nodes: genKwargs(nodes.value)
      }
    ]
  }

  fetch('/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(destNodes)
  }).then(() => {
    pushNotification('Running..', 'success')
  })
}

function save() {
  pushNotification('Saved.', 'info')
}
</script>
