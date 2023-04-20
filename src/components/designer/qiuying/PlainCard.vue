<template>
  <v-menu open-on-hover location="top end" origin="start bottom">
    <template #activator="{ props }">
      <v-card flat rounded="lg" class="px-3 py-2 grow-0 relative overflow-visible flex items-center"
        width="fit-content" :color="transparent ? 'transparent' : ''"
        :class="{ 'b-1 b-dashed b-gray-400 box-border': dashed }" v-bind="props">
        <slot></slot>
      </v-card>
    </template>
    <v-btn flat size="20" @click="$emit('remove')" v-if="!!$attrs.onRemove" icon>
      <v-icon icon="mdi-close" size="16" />
    </v-btn>
  </v-menu>
</template>

<script setup lang="ts">
export interface Props {
  transparent?: boolean
  dashed?: boolean
}

withDefaults(defineProps<Props>(), {
  transparent: false,
  dashed: false
})
</script>