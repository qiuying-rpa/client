<template>
  <plain-card>
    将
    <plain-value v-model="variable" placeholder="变量名" class="mx-0.5 bg-red-100 c-red-400" />
    赋值为
    <uncertain-value class="mx-0.5" v-model="variableValue" />
  </plain-card>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useDesignerStore } from '@/store/designer'

const variable = ref('')
const variableValue = ref('')

const { setVariable, unsetVariable } = useDesignerStore()

watch(variable, (val, oldVal) => {
  unsetVariable('foo', oldVal)
  setVariable('foo', val)
})
</script>
