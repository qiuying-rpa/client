<template>
  <v-app>
    <notifier />
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import Notifier from "@/components/app/Notifier.vue";
</script>
