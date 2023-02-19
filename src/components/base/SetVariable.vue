<template>
    <div class="flex items-center text-sm">
        将
        <plain-value v-model="variable" placeholder="变量名" class="mx-0.5"/>
        赋值为
        <uncertain-value class="mx-0.5"/>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const variable = ref('')
</script>
