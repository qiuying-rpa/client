<template>
  <div
    class="pl-8 relative before-content-none before-w-0.4 before-h-100% before-absolute before-left-0 before-bg-slate w-fit"
    @dragover.stop="matchInsertPosition">
    <template v-if="props.modelValue.length">
      <template v-for="{ is, id, modelValue, title }, index in props.modelValue" :key="id">
        <hint-node v-if="is === 'hint-node'" :class="{ 'mt-4': index > 0 }" />
        <component v-else :is="is.startsWith('exec') ? 'div' : 'node-shell'" :id="id"
          :class="{ 'mt-4': index > 0 }">
          <component :modelValue="modelValue" :is="customizedComponents.includes(is) ? is : 'sun-wukong'"
            :title="title" @update:modelValue="updateNodeModelValue(index, $event)"
            :class="{ 'mt-4': index > 0 && is.startsWith('exec') }" @remove="removeNode(index)" />
        </component>
      </template>
    </template>
    <hint-node v-else>
      拖拽以选取操作
    </hint-node>
  </div>
</template>

<script setup lang="ts">
import { useDraggingStore, useDraggingOverStore } from '@/store/designer'
import { deepCopy, uuid } from '@/utils/common'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import ComponentsModelMap from '@/assets/components.json'

interface Props {
  modelValue: ProcessNode[]
}

const customizedComponents = ['print-log', 'set-variable', 'exec-circular', 'exec-conditional']
const currId = uuid()

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const draggingOverStore = useDraggingOverStore()

const { dragging } = storeToRefs(useDraggingStore())
const { draggingOver } = storeToRefs(draggingOverStore)

watch(draggingOver, (val) => {
  if (val !== currId) {
    setTimeout(removeHintNode)
  }
})

function updateNodeModelValue (targetIndex: number, modelValue: ProcessNodeModelValue) {
  const newModelValue = deepCopy(props.modelValue)
  newModelValue[targetIndex].modelValue = modelValue
  emits('update:modelValue', newModelValue)
}

function insertNode (targetIndex: number) {
  const nodesNew = deepCopy(props.modelValue)
  if (customizedComponents.some(cc => cc === dragging.value)) {
    nodesNew.splice(targetIndex, 1, {
      id: uuid(),
      is: dragging.value,
      modelValue: {}
    })
  } else {
    const matchedComponent = Object.entries(ComponentsModelMap).find(([key]) => key === dragging.value)

    nodesNew.splice(targetIndex, 1, {
      id: uuid(),
      is: dragging.value,
      modelValue: matchedComponent![1].kwargs,
      title: matchedComponent![1].title
    })
  }

  emits('update:modelValue', nodesNew)
}

function removeNode (targetIndex: number) {
  const nodesNew = deepCopy(props.modelValue)
  nodesNew.splice(targetIndex, 1)
  emits('update:modelValue', nodesNew)
}

function matchInsertPosition (event: DragEvent) {
  let min = Infinity
  let minIndex = -1
  props.modelValue.forEach((node, index) => {
    const nodeDom = document.getElementById(node.id)

    if (nodeDom) {
      const { y } = nodeDom.getBoundingClientRect()
      const yDelta = event.y - y
      if (yDelta >= 0 && yDelta < min) {
        min = yDelta
        minIndex = index
      }
    }
  })

  if (!props.modelValue[minIndex + 1] || props.modelValue[minIndex + 1].is !== 'hint-node') {
    const nodesNew = props.modelValue.filter(n => n.is !== 'hint-node')
    nodesNew.splice(minIndex + 1, 0, {
      id: uuid(),
      is: 'hint-node'
    })
    emits('update:modelValue', nodesNew)

    draggingOverStore.setDraggingOver(currId)
    window.addEventListener('dragend', onDragend)
  }
}

function onDragend () {
  const targetIndex = props.modelValue.findIndex(n => n.is === 'hint-node')
  if (targetIndex > -1 && draggingOver.value === currId) {
    insertNode(targetIndex)
  }

  window.removeEventListener('dragend', onDragend)
}

function removeHintNode () {
  const nodesNew = props.modelValue.filter(n => n.is !== 'hint-node')
  emits('update:modelValue', nodesNew)
}
</script>
