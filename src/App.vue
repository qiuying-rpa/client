<template>
  <v-app>
    <notifier />
    <error-fallback v-if="error" />
    <router-view v-else />
  </v-app>
</template>

<script setup lang="ts">
import Notifier from "@/components/app/Notifier.vue"
import ErrorFallback from "@/components/app/ErrorFallback.vue"
import { useAppStore } from "./store/app"
import { storeToRefs } from "pinia"

const { error } = storeToRefs(useAppStore())
</script>
