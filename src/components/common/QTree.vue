<template>
  <div v-for="{ title, icon, children, value }, index in props.items" :key="index">
    <list-item :item="{ title, icon, value }" :offset="[props.depth * 2.5, 0]"
      @click="children?.length && toggleOpen(value)">
      <template #item-before v-if="children?.length">
        <div class="mr-1">
          <icon-button icon="i-mdi-menu-down" v-if="openLocal.includes(value)" />
          <icon-button icon="i-mdi-menu-right" v-else />
        </div>
      </template>
    </list-item>
    <div v-if="children?.length && openLocal.includes(value)">
      <q-tree :items="children" :depth="props.depth + 1" v-model:open="openLocal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  items: TreeItem[]
  depth?: number
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

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all .2s cubic-bezier(.4, 0, .2, 1);
}

.v-enter-from,
.v-leave-to {
  height: 0;
  opacity: 0;
}
</style>
