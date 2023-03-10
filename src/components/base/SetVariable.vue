<template>
  <plain-card>
    将
    <plain-value v-model="variable" placeholder="变量名" class="mx-0.5 bg-red-100 c-red-400" />
    赋值为
    <uncertain-value class="mx-0.5" />
  </plain-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const variable = ref('')
</script>
