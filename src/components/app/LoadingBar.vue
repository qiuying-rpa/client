<template>
  <v-progress-linear :model-value="loading" color="primary" height="2" v-if="loading" />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'

const delta = 3

const { loading } = storeToRefs(useAppStore())
const { setLoading } = useAppStore()

watchEffect(() => {
  if (loading.value === 0) {
    fire()
  }
})

function fire() {
  const newValue = loading.value! + delta
  setLoading(newValue)

  if (newValue <= 100) {
    setTimeout(() => {
      fire()
    }, 100)
  } else {
    setLoading(null)
  }
} 
</script>