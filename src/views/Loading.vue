<template>
  <div class="w-100% h-100% flex justify-center items-center">
    <v-progress-circular color="primary" indeterminate />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';

const { menus } = useAppStore()
const router = useRouter()

if (menus.length > 0) {
  router.replace(menus[0].path)
} else {
  router.replace('/sign-in')
}
</script>
