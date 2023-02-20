<template>
    <div
        v-for="{title, icon, children}, index in props.items"
        :key="index"
    >
        <list-item :item="{title, icon}" :offset="[props.depth*2.5, 0]">
            <template #item-before v-if="children?.length">
                <div class="i-mdi-menu-down mr-1 text-lg" />
            </template>
        </list-item>
        <tree-view :items="children" :depth="props.depth+1"/>
    </div>
</template>

<script setup lang="ts">

interface Props {
    items: TreeItem[],
    depth?: number
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  depth: 0
})
</script>
