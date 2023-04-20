<template>
  <div class="flex w-100% overflow-hidden h-100vh">
    <!-- task list -->
    <div class="w-15% pa-1 box-border b-r-1 b-r-solid b-gray-3 overflow-overlay">
      <tree-view :items="tasks" />
    </div>

    <!-- nodes -->
    <div class="w-15% pa-1 box-border overflow-auto">
      <tree-view :items="nodes" />
    </div>

    <!-- drawing board -->
    <div class="grow-1 flex flex-col text-sm c-#334155 bg-slate-100 overflow-hidden h-100% dots-bg">
      <div class="w-100% bg-light-300 pa-2 box-border justify-between flex items-center">
        <div>
          <span v-if="!editingTitle" @click="onClickTitle" class="fw-bold select-none cursor-text">{{
            title
          }}</span>
          <plain-value class="bg-gray-200 c-gray-600 pa-0" v-else v-model="title"
            placeholder="请输入流程名称" @keydown.enter="editingTitle = false" ref="titleInputRef" />
        </div>
      </div>
      <div class="grow-1 overflow-hidden">
        <process-designer :meta="{ title }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDraggingStore } from '@/store/designer'
import TreeView from '@/components/app/TreeView.vue'
import ProcessDesigner from '@/components/designer/ProcessDesigner.vue'
import PlainValue from '@/components/designer/qiuying/PlainValue.vue'
import { nextTick, ref, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ComponentsModelMap from '@/assets/components.json'

const { setDragging } = useDraggingStore()

const nodes = [
  {
    title: '基础',
    value: 'base',
    icon: 'mdi-apps',
    children: Object.entries(ComponentsModelMap).filter(([key]) => key.startsWith('base')).map(([key, value]) => ({
      title: value.title,
      value: key,
      icon: 'mdi-square-medium',
      onDrag: () => setDragging(key)
    }))
  },
  {
    title: '执行逻辑',
    value: 'exec-logic',
    icon: 'mdi-transit-connection-variant',
    children: [
      {
        title: '条件执行',
        value: 'exec-conditional',
        icon: 'mdi-less-than-or-equal',
        onDrag: () => setDragging('exec-conditional')
      },
      {
        title: '循环执行',
        value: 'exec-circular',
        icon: 'mdi-sync',
        onDrag: () => setDragging('exec-circular')
      }
    ]
  },
  {
    title: 'Web 操作',
    value: 'web',
    icon: 'mdi-web',
    children: Object.entries(ComponentsModelMap).filter(([key]) => key.startsWith('web')).map(([key, value]) => ({
      title: value.title,
      value: key,
      icon: 'mdi-spider-web',
      onDrag: () => setDragging(key)
    }))
  },
  {
    title: 'Excel 操作',
    value: 'excel',
    icon: 'mdi-file-excel-outline',
    children: Object.entries(ComponentsModelMap).filter(([key]) => key.startsWith('excel')).map(([key, value]) => ({
      title: value.title,
      value: key,
      icon: 'mdi-file-excel-box-outline',
      onDrag: () => setDragging(key)
    }))
  }
]

const tasks = [
  {
    title: '我的分类一',
    value: 'category-1',
    icon: 'mdi-archive-outline',
    children: [
      {
        title: '流程 1',
        value: 'process-1',
        icon: 'mdi-file-tree'
      },
      {
        title: '流程 2',
        value: 'process-2',
        icon: 'mdi-file-tree'
      }
    ]
  },
  {
    title: '我的分类二',
    value: 'category-2',
    icon: 'mdi-archive-outline',
    children: [
      {
        title: '流程 3',
        value: 'process-3',
        icon: 'mdi-file-tree'
      },
      {
        title: '流程 4',
        value: 'process-4',
        icon: 'mdi-file-tree'
      }
    ]
  },
  {
    title: '流程 1',
    value: 'process-1',
    icon: 'mdi-file-tree'
  },
]

const editingTitle = ref(false)
const title = ref('未命名')
const titleInputRef = ref<typeof PlainValue | null>(null)

watchEffect(() => {
  if (!title.value && !editingTitle.value) {
    title.value = '未命名'
  }
})

function onClickTitle() {
  editingTitle.value = true
  nextTick(() => {
    titleInputRef.value?.cursorMoveLast?.()
    const stop = onClickOutside(titleInputRef.value?.$el, () => { editingTitle.value = false; stop?.() })
  })
}
</script>

<style scoped>
.dots-bg {
  background-image: radial-gradient(rgba(0, 0, 0, 0.17) 1px, transparent 0);
  background-size: 20px 20px;
  background-position: -9px -9px;
  background-repeat: repeat;
  background-position: 2% 37%;
}
</style>
