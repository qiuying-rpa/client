<template>
  <div class="flex w-100% overflow-hidden">
    <!-- task list -->
    <div class="w-12% flex-col pa-4 box-border b-r-1 b-r-solid b-gray-3">
      <q-tree :items="tasks" v-model:open="tasksOpen" />
    </div>

    <!-- nodes -->
    <div class="w-15% pa-4 box-border overflow-auto">
      <q-tree :items="nodes" />
    </div>

    <!-- drawing board -->
    <div class="grow-1 flex flex-col text-sm c-#334155 bg-slate-100 overflow-hidden h-100% dots-bg">
      <div class="w-100% bg-light-300 pa-2 box-border justify-between flex items-center">
        <div>
          <span v-if="!editingTitle" @click="onClickTitle" class="fw-bold">{{ title }}</span>
          <plain-value class="bg-gray-200 c-gray-600" v-else v-model="title" placeholder="请输入流程名称"
            @keydown.enter="editingTitle = false" ref="titleInputRef" />
        </div>
      </div>
      <div class="grow-1 overflow-auto">
        <process-designer :meta="{ title }" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { useDraggingStore } from '@/store/designer'
import PlainValue from '@/components/base/PlainValue.vue'
import { nextTick, reactive, ref, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ComponentsModelMap from '@/assets/components.json'

const { setDragging } = useDraggingStore()

const nodes = reactive([
  {
    title: '基础',
    value: 'base',
    icon: 'i-mdi-apps',
    children: [
      {
        title: '设置变量',
        value: 'set-variable',
        icon: 'i-mdi-variable',
        onDrag: genDragHandler('set-variable')
      },
      {
        title: '打印日志',
        value: 'print-log',
        icon: 'i-mdi-file-document-outline',
        onDrag: genDragHandler('print-log')
      }
    ]
  },
  {
    title: '执行逻辑',
    value: 'exec-logic',
    icon: 'i-mdi-transit-connection-variant',
    children: [
      {
        title: '条件执行',
        value: 'exec-conditional',
        icon: 'i-mdi-less-than-or-equal',
        onDrag: genDragHandler('exec-conditional')
      },
      {
        title: '循环执行',
        value: 'exec-circular',
        icon: 'i-mdi-sync',
        onDrag: genDragHandler('exec-circular')
      }
    ]
  },
  {
    title: 'Web 操作',
    value: 'web',
    icon: 'i-mdi-web',
    children: Object.entries(ComponentsModelMap).filter(([key]) => key.startsWith('web')).map(([key, value]) => ({
      title: value.title,
      value: key,
      icon: 'i-mdi-spider-web',
      onDrag: genDragHandler(key)
    }))
  },
  {
    title: 'Excel 操作',
    value: 'excel',
    icon: 'i-mdi-file-excel-outline',
    children: Object.entries(ComponentsModelMap).filter(([key]) => key.startsWith('excel')).map(([key, value]) => ({
      title: value.title,
      value: key,
      icon: 'i-mdi-file-excel-box-outline',
      onDrag: genDragHandler(key)
    }))
  }
])

const tasks = reactive([
  {
    title: '我的分类一',
    value: 'category-1',
    icon: 'i-mdi-archive-outline',
    children: [
      {
        title: '流程 1',
        value: 'process-1',
        icon: 'i-mdi-file-tree'
      },
      {
        title: '流程 2',
        value: 'process-2',
        icon: 'i-mdi-file-tree'
      }
    ]
  },
  {
    title: '我的分类二',
    value: 'category-2',
    icon: 'i-mdi-archive-outline',
    children: [
      {
        title: '流程 3',
        value: 'process-3',
        icon: 'i-mdi-file-tree'
      },
      {
        title: '流程 4',
        value: 'process-4',
        icon: 'i-mdi-file-tree'
      }
    ]
  }
])

const tasksOpen = ref([])
const editingTitle = ref(false)
const title = ref('未命名')
const titleInputRef = ref<typeof PlainValue | null>(null)

watchEffect(() => {
  if (!title.value && !editingTitle.value) {
    title.value = '未命名'
  }
})

function genDragHandler(component: string) {
  return () => setDragging(component)
}

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
