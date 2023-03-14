<template>
  <node-shell class="mt-4">
    <plain-card class="relative" @remove="$attrs.onRemove">
      <div>
        循环执行，直到
        <q-select class="inline-block" :items="[
          {
            title: '遍历所有元素',
            value: 'iteration'
          },
          {
            title: '条件不满足',
            value: 'conditionFalsy'
          }
        ]" v-model="circularTarget" />
      </div>
    </plain-card>
  </node-shell>
  <div>
    <div class="pl-8">
      <div
        class="pl-8 py-4 relative before-content-none before-w-0.4 before-h-100% before-absolute before-left-0 before-bg-slate w-fit box-border before-top-0">
        <node-shell>
          <set-variable />
        </node-shell>
        <node-shell class="mt-4">
          <print-log />
        </node-shell>
        <node-shell class="mt-4">
          <print-log />
        </node-shell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const circularTarget = ref('')
</script>
