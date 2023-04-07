<template>
  <div
    class="relative before-absolute before-content-none before-w-2 before-h-2 before-rd-50% before-bg-slate before-left--8.75 before-top-50% before-translate-y--50% after-absolute after-content-none after-w-8 after-b-t-0.1rem after-b-t-slate after-b-t-dashed after-left--8 after-top-50% after-translate-y--50%"
    @dragover.prevent>
    <plain-card transparent dashed class="c-gray-500 whitespace-nowrap">
      <slot>释放以添加操作</slot>
    </plain-card>
  </div>
</template>
