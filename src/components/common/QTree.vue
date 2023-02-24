<template>
  <div v-for="{ title, icon, children, value }, index in props.items" :key="index">
    <template v-if="openLocal.includes(value)">
      <list-item :item="{ title, icon, value }" :offset="[props.depth * 2.5, 0]"
        @click="children?.length && toggleOpen(value)">
        <template #item-before v-if="children?.length">
          <icon-button class="mr-1" icon="i-mdi-menu-down" />
        </template>
      </list-item>
      <q-tree :items="children" :depth="props.depth + 1" v-model:open="openLocal" />
    </template>
    <template v-else>
      <list-item :item="{ title, icon, value }" :offset="[props.depth * 2.5, 0]"
        @click="children?.length && toggleOpen(value)">
        <template #item-before v-if="children?.length">
          <icon-button class="mr-1" icon="i-mdi-menu-right" />
        </template>
      </list-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type ValueType = string | number

interface Props {
  items: TreeItem[],
  depth?: number,
  open?: ValueType[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  depth: 0
})

const emits = defineEmits(['update:open'])

const openLocal = ref<ValueType[]>([])

function toggleOpen (value: ValueType) {
  openLocal.value = openLocal.value.includes(value) ? openLocal.value.filter(o => o !== value) : openLocal.value.concat(value)
}

watch(openLocal, (value) => {
  if (props.open instanceof Array) {
    emits('update:open', props.open.concat(value.filter(v => !props.open?.includes(v))))
  }
})
</script>
