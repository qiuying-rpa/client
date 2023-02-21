<template>
    <div>
        <list-item
            v-for="item, index in props.items"
            :key="index"
            :item="item"
            :offset="props.offset"
        >
        </list-item>
    </div>
</template>

<script lang="ts" setup>

interface Props {
    items: ListItem [],
    offset: [number, number]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  offset: () => [0, 0]
})
</script>
