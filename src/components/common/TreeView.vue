<template>
    <div
        v-for="{title, icon, children}, index in props.items"
        :key="index"
    >
        <list-item :item="{title, icon}">
            <template #item-before v-if="children?.length">
                <div class="i-mdi-menu-down mr-1 text-lg" />
            </template>
        </list-item>
        <list-view :items="children" :offset="[2.5 + props.offset[0], 0]">
            <template #default="{attrs}">
                <tree-view v-bind="attrs"/>
            </template>
        </list-view>
    </div>
</template>

<script setup lang="ts">

interface Props {
    items: ViewItem[],
    offset?: [number, number]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  offset: () => [0, 0]
})
</script>
