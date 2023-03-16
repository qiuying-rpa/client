<template>
  <div class="w-fit h-fit pa-0.5 cursor-pointer"
    :class="[props.shape === 'circle' ? 'rd-50%' : 'rd-2'].concat(props.active ? ['bg-#dbeafe', 'hover-bg-#dbeafe'] : ['hover-bg-gray-2'])">
    <div class="text-lg" :class="props.icon" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  shape?: 'circle' | 'square'
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shape: 'circle',
  active: false
})
</script>
