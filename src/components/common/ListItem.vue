<template>
  <div class="select-none pa-2 rd-1 text-sm opacity-80 flex items-center cursor-pointer"
    :class="props.active ? ['bg-#dbeafe', 'hover-bg-#dbeafe'] : ['hover-bg-#f4f4f5']">
    <div class="flex items-center overflow-hidden pointer-events-none" :style="{
      paddingLeft: props.offset[0] + 'rem',
      paddingTop: props.offset[1] + 'rem'
    }">
      <slot name="item-before" />
      <div :class="[props.item.icon]" class="mr-1 text-lg shrink-0" />
      <div class="overflow-hidden text-ellipsis whitespace-nowrap">{{ props.item.title }}</div>
    </div>
    <slot name="item-after" />
  </div>
</template>

<script setup lang="ts">

interface Props {
  item: ListItem
  offset: [number, number]
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  item: () => ({
    value: '',
    title: ''
  }),
  offset: () => [0, 0],
  active: false
})
</script>
