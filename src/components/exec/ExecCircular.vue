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
        ]" v-model="type" />
        <dot-form>
          <kwargs-form v-if="type === 'iteration'" v-model="iterationConf" />
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
      <exec-sequential class="py-4 before-top-0" :modelValue="props.modelValue?.execution || []"
        @update:modelValue="emits('update:modelValue', { ...props.modelValue, execution: $event })" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

interface Props {
  modelValue?: {
    type: string
    iterationConf?: KwargsFormModelValue[]
    conditions?: ConditionItem[]
    execution: ProcessNode[]
  }
}

const blankCondition = {
  left: '',
  middle: '',
  right: ''
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    type: 'iteration',
    execution: []
  })
})
const emits = defineEmits(['update:modelValue'])

const conditions = reactive<ConditionsItem[]>([{ ...blankCondition, onAdd: addCondition }])
const iterationConf = reactive<KwargsFormModelValue[]>([
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
  }
])

watch(conditions, (conditions) => {
  emits('update:modelValue', { ...props.modelValue, conditions })
})

watch(iterationConf, (iterationConf) => {
  emits('update:modelValue', { ...props.modelValue, iterationConf })
})

watch(() => props.modelValue.type, (val) => {
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

const type = computed({
  set: (type) => emits('update:modelValue', { ...props.modelValue, type }),
  get: () => props.modelValue.type
})
</script>
