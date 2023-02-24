<template>
  <div class="hover-bg-gray-2 rd-50% w-fit h-fit pa-0.5">
    <div class="text-lg" :class="[props.icon]" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: ''
})
</script>
