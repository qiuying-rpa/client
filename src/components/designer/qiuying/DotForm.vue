<template>
  <v-menu class="relative overflow-visible" ref="containerRef" v-model="show"
    :close-on-content-click="false">
    <template #activator="{ props }">
      <v-btn :icon="`${show ? 'mdi-circle-outline' : 'mdi-circle'}`" size="x-small" flat
        v-bind="props" />
    </template>
    <v-card class="pa-2" flat rounded="lg">
      <slot></slot>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
