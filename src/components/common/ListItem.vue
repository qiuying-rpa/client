<template>
<div
    class="hover-bg-#f4f4f5 pa-2 rd-1 text-sm opacity-80 flex items-center cursor-pointer"
>
    <slot name="item-before"/>
    <div
        class="flex items-center"
        :style="{
            paddingLeft: props.offset[0] + 'rem',
            paddingTop: props.offset[1] + 'rem'
        }"
    >
        <div :class="[props.item.icon]" class="mr-1 text-lg"/>
        <div>{{ props.item.title }}</div>
    </div>
    <slot name="item-after"/>
</div>
</template>

<script setup lang="ts">

interface Props {
    item: ViewItem,
    offset?: [number, number]
}

const props = withDefaults(defineProps<Props>(), {
  item: () => ({
    icon: '',
    title: ''
  }),
  offset: () => [0, 0]
})
</script>
