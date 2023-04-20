<template>
  <v-progress-linear :model-value="loading" color="primary" height="1" v-if="loading" absolute />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'

let delta = 0

const { loading } = storeToRefs(useAppStore())
const { setLoading } = useAppStore()

watchEffect(() => {
  if (loading.value === 0) {
    delta = 2
    move()
  }
})

function move() {
  if (loading.value! < 90 || loading.value === 100) {
    const newValue = loading.value! + delta
    setLoading(newValue)

    if (newValue < 100) {
      setTimeout(() => {
        move()
      }, 100)
    } else {
      setTimeout(() => setLoading(null), 200)
    }

    if (delta > 0.1) {
      delta -= 0.1
    }
  }
} 
</script>