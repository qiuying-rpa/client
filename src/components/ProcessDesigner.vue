<template>
    <div class="flex h-100vh w-100vw">
        <!-- nodes -->
        <div class="b-gray-3 b-1 b-r-solid w-80 flex-col pa-4 box-border">
            <tree-view :items="nodes"/>
        </div>

        <!-- drawing board -->
        <div class="grow-1 pa-8 flex-col text-sm c-#334155">
            <set-variable />
            <br >
            <print-log />
        </div>

        <!-- task list -->
        <div class="b-gray-3 b-1 b-l-solid w-80 flex-col pa-4 box-border">
          <tree-view :items="tasks"/>
        </div>
    </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { reactive } from 'vue'

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
</script>
