<template>
  <v-progress-linear :model-value="loading" color="primary" height="2" v-if="loading" absolute />
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
    delta = 3.7
    move()
  }
})

function move() {
  if (loading.value! < 90 || loading.value! >= 94) {
    const newValue = loading.value! + delta
    setLoading(newValue)

    if (newValue <= 100) {
      setTimeout(() => {
        move()
      }, 100)
    } else {
      setLoading(null)
    }

    if (delta > 0.5) {
      delta -= 0.1
    }
  }
} 
</script>