<template>
  <div class="flex h-100% w-100%">
    <q-notifier content="一条信息~" type="success" />
    <!-- <div class="shrink-0 bg-white b-r-1 b-gray-3 b-r-solid pa-2 flex flex-col items-center">
      <img src="qiuying.svg" width="24" class="grow-0 cursor-pointer mb-3" />
      <q-tab orientation="vertical" :items="[
        {
          title: 'processes',
          value: 'processes',
          icon: 'i-mdi-format-list-bulleted'
        },
        {
          title: 'designer',
          value: 'designer',
          icon: 'i-mdi-pencil-ruler'
        }
      ]" />
    </div> -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// import { useNotifierStore } from '@/store/app'
// import { onMounted } from 'vue'

// const { pushNotification } = useNotifierStore()

// onMounted(() => {
//   setTimeout(() => {
//     pushNotification('test', 'info')
//     setTimeout(() => {
//       pushNotification('test222', 'warn')
//     }, 370)
//   }, 370)
// })
</script>
