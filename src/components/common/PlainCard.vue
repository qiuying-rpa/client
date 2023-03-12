<template>
  <div class="flex items-center text-sm pa-4 rd-2 w-fit"
    :class="[(dashed !== undefined && dashed !== false) ? 'b-1 b-dashed b-gray-400 box-border' : '', (transparent !== undefined && transparent !== false) ? 'bg-transparent' : 'bg-white']">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  dashed: any,
  transparent: any
}

defineProps<Props>()
</script>
