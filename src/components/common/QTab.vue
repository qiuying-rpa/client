<template>
  <div class="w-100% bg-light-300 pa-2 box-border" v-if="props.orientation === 'horizontal'">
    tabs
  </div>
  <div v-else class="flex flex-col items-center">
    <div v-for="{ icon, title, value }, index in props.items" :key="index"
      :class="{ 'mt-3': index > 0 }">
      <icon-button :icon="icon" :title="title" shape="square" class="pa-2"
        :active="active === value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  orientation?: 'horizontal' | 'vertical'
  items: TabItem[]
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal'
})

const active = ref('designer')
</script>
