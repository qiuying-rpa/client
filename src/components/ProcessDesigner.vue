<template>
  <div class="w-100%">
    <exec-sequential v-model="nodes" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import { uuid } from '@/utils/common'

const nodes = ref([
  {
    id: uuid(),
    is: 'set-variable',
    modelValue: {}
  },
  {
    id: uuid(),
    is: 'print-log',
    modelValue: {}
  },
  {
    id: uuid(),
    is: 'exec-conditional',
    modelValue: {}
  },
  {
    id: uuid(),
    is: 'exec-circular',
    modelValue: {}
  },
  {
    id: uuid(),
    is: 'sun-wukong',
    title: '打开已有 Excel',
    modelValue: [
      {
        label: 'Excel 文件路径',
        argName: 'file_path',
        value: '""'
      },
      {
        label: 'Sheet 名称',
        argName: 'sheet_name',
        value: '"1"'
      },
      {
        label: '密码',
        argName: 'password',
        value: 'None'
      },
      {
        label: '是否可视化',
        argName: 'visible',
        value: 'True',
        options: [
          {
            title: '是',
            value: 'True'
          },
          {
            title: '否',
            value: 'False'
          }
        ]
      }
    ]
  }
])
</script>
