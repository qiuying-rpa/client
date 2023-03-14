<template>
  <div class="flex flex-col">
    <template v-for="item, index in props.modelValue" :key="index">
      <div v-if="Object.prototype.toString.call(item) === '[object Object]'"
        class="flex items-center min-h-7.5">
        <i class="inline-block text-lg mr-1 i-mdi-circle-medium"
          v-if="!(props.inside || props.inside === '')" />
        <span class="text-xs mx-1 whitespace-nowrap">{{ (item as KwargsFormModelValue).label }}</span>
        <template v-if="typeof (item as KwargsFormModelValue).value === 'string'">
          <q-select v-if="(item as KwargsFormModelValue).options"
            :items="(item as KwargsFormModelValue).options" />
          <uncertain-value v-else />
        </template>
        <template v-else>
          <kwargs-form inside class="mt-2 b-l-1 b-l-gray-3 b-l-solid ml-2 rd-12px pl-2"
            :modelValue="(item as KwargsFormModelValue).value as KwargsFormModelValue[]" />
        </template>
      </div>
      <div v-else class="flex items-center" :class="{ 'mt-2': index > 0 }">
        <kwargs-form inside :modelValue="item as KwargsFormModelValue[]"
          class="b-l-1 b-l-gray-3 b-l-solid rd-12px pl-2" />
        <icon-button :icon="index > 0 ? 'i-mdi-minus' : 'i-mdi-plus'" class="ml-2" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">

interface Props {
  modelValue?: KwargsFormModelValue[] | KwargsFormModelValue[][]
  inside?: any
}

const props = defineProps<Props>()
</script>
