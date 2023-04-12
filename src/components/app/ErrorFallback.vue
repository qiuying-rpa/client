<template>
  <v-main class="w-100% flex justify-center items-center h-100%">
    <div>
      {{ error }}
      <v-btn to="/" @click="goBack" variant="text" color="primary">
        Back
      </v-btn>
    </div>
  </v-main>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'

const { error, setError } = useAppStore()

function goBack() {
  setError(null)
}
</script>
