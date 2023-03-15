<template>
  <node-shell class="mt-4">
    <plain-card class="relative select-none" @remove="$attrs.onRemove">
      <div class="flex items-center">
        循环执行，直到
        <q-select class="inline-block mx-1" :items="[
          {
            title: '遍历所有元素',
            value: 'iteration'
          },
          {
            title: '所有条件不满足',
            value: 'allConditionFalsy'
          },
          {
            title: '任意条件不满足',
            value: 'anyConditionFalsy'
          }
        ]" v-model="circulationType" />
        <dot-form>
          <kwargs-form v-if="circulationType === 'iteration'" :modelValue="[
            {
              label: '访问目标',
              argName: 'target',
              value: ''
            },
            {
              label: '每次得到元素',
              argName: 'item',
              value: ''
            },
            {
              label: '元素索引',
              argName: 'index',
              value: ''
            },
          ]" />
          <template v-else>
            <condition-item :modelValue="condition" @update:modelValue="conditions[index] = $event"
              v-for="condition, index in conditions" :key="index + refreshKey"
              v-bind="index === 0 ? { onAdd: addCondition } : { onRemove: () => removeCondition(index) }"
              :class="{ 'mt-2': index > 0 }" />
          </template>
        </dot-form>
      </div>
    </plain-card>
  </node-shell>
  <div>
    <div class="pl-8">
      <exec-sequential class="py-4 before-top-0" :modelValue="props.modelValue?.circulationBody || []"
        @update:modelValue="emits('update:modelValue', { ...props.modelValue, circulationBody: $event })" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

interface Props {
  modelValue?: {
    circulationType: string
    circulationBody: ProcessNode[]
    circulationConditions: ConditionItem[]
  }
}

const blankCondition = {
  left: '',
  middle: '',
  right: ''
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    circulationType: 'iteration',
    circulationConditions: [],
    circulationBody: []
  })
})
const emits = defineEmits(['update:modelValue'])

const conditions = reactive<ConditionsItem[]>([{ ...blankCondition, onAdd: addCondition }])

watch(conditions, (circulationConditions) => {
  emits('update:modelValue', { ...props.modelValue, circulationConditions })
})

watch(() => props.modelValue.circulationType, (val) => {
  if (val === 'iteration') {
    conditions.splice(0)
    conditions.push({ ...blankCondition, onAdd: addCondition })
  }
})

function addCondition () {
  conditions.push({ ...blankCondition, onRemove: removeCondition })
}

function removeCondition (index: number) {
  conditions.splice(index, 1)
  refreshKey.value = new Date().getTime()
}

const refreshKey = ref(new Date().getTime())

const circulationType = computed({
  set: (circulationType) => emits('update:modelValue', { ...props.modelValue, circulationType }),
  get: () => props.modelValue.circulationType
})
</script>
