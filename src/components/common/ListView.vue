<template>
    <div>
        <slot :attrs="{items, offset}">
            <list-item
                v-for="item, index in props.items"
                :key="index"
                :item="item"
                :offset="props.offset"
            >
            </list-item>
        </slot>
    </div>
</template>

<script lang="ts" setup>

interface Props {
    items: ViewItem [],
    offset?: [number, number]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  offset: () => [0, 0]
})
</script>
