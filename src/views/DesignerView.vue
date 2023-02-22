<template>
    <div class="flex h-100vh w-100%">
        <!-- nodes -->
        <div class="w-2.5% pa-4 box-border b-r-1 b-r-solid b-gray-3 ">

        </div>

        <!-- task list -->
        <div class="w-15% flex-col pa-4 box-border b-r-1 b-r-solid b-gray-3">
          <q-tree :items="tasks" v-model:open="tasksOpen"/>
        </div>

        <!-- nodes -->
        <div class="w-15% pa-4 box-border">
            <q-tree :items="nodes"/>
        </div>

        <!-- drawing board -->
        <div class="grow-1 flex flex-col text-sm c-#334155 bg-#f2f3f8 overflow-hidden h-100%">
          <q-tab class="shrink-0"/>
          <div class="grow-1 overflow-auto">
            <div class="flex justify-center py-4 ">
              <div class="min-w-50%">
                <process-designer />
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const nodes = reactive([
  {
    title: '基础',
    value: 'base',
    icon: 'i-mdi-apps',
    children: [
      {
        title: '设置变量',
        value: 'set-variable',
        icon: 'i-mdi-variable'
      },
      {
        title: '打印日志',
        value: 'print-log',
        icon: 'i-mdi-file-document-outline'
      }
    ]
  },
  {
    title: '执行逻辑',
    value: 'exec-logic',
    icon: 'i-mdi-arrow-decision-outline',
    children: [
      {
        title: '条件执行',
        value: 'exec-conditional',
        icon: 'i-mdi-less-than-or-equal'
      },
      {
        title: '循环执行',
        value: 'exec-circular',
        icon: 'i-mdi-sync'
      }
    ]
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
</script>
