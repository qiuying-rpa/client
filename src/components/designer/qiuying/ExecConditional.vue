<template>
  <div>
    <node-shell>
      <plain-card class="relative select-none" @remove="$attrs.onRemove">
        <div class="flex items-center">
          如果满足
          <v-select class="inline-block mx-1 min-w-6.5rem" density="compact" :items="[
            {
              title: '全部条件',
              value: 'all'
            },
            {
              title: '任意条件',
              value: 'any'
            }
          ]" v-model="type" variant="outlined" hide-details placeholder="请选择" />
          <dot-form>
            <condition-item :modelValue="condition" @update:modelValue="conditions[index] = $event"
              v-for="condition, index in conditions" :key="index + refreshKey"
              v-bind="index === 0 ? { onAdd: addCondition } : { onRemove: () => removeCondition(index) }"
              :class="{ 'mt-2': index > 0 }" />
          </dot-form>
        </div>
      </plain-card>
    </node-shell>
    <div class="flex">
      <div>
        <div
          class="flex items-center mt-4 relative before-absolute before-content-none before-w-0.4 before-h-4 before-bg-slate before-left-8 before-top--2 before-translate-y--50%">
          <v-menu open-on-hover location="end center" origin="auto">
            <template #activator="{ props }">
              <div v-bind="props">
                <plain-card class="relative select-none">
                  则执行
                </plain-card>
              </div>
            </template>
            <v-btn flat size="20" @click="addFalsy" icon v-if="props.modelValue.noFalsy">
              <v-icon icon="mdi-plus" size="16" />
            </v-btn>
          </v-menu>
          <div class="bg-slate grow-1 h-0.4" v-if="!props.modelValue.noFalsy" />
        </div>
        <div class="pl-8">
          <exec-sequential class="py-4 before-top-0"
            :modelValue="props.modelValue.executionTruthy || []"
            @update:modelValue="emits('update:modelValue', { ...props.modelValue, executionTruthy: $event })" />
        </div>
      </div>
      <div v-if="!props.modelValue.noFalsy">
        <div class="pt-4">
          <plain-card class="relative select-none" @remove="removeFalsy">
            否则执行
          </plain-card>
        </div>
        <div class="pl-8">
          <exec-sequential class="py-4 before-top-0"
            :modelValue="props.modelValue.executionFalsy || []"
            @update:modelValue="emits('update:modelValue', { ...props.modelValue, executionFalsy: $event })" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'

export interface Props {
  modelValue?: {
    type: 'any' | 'all'
    conditions: ConditionItem[]
    executionTruthy: ProcessNode[]
    executionFalsy: ProcessNode[]
    noFalsy: boolean
  }
}

const blankCondition = {
  left: '',
  middle: '',
  right: ''
}

const props = withDefaults(defineProps<Props>(), {
  modelValue() {
    return {
      type: 'all',
      conditions: [],
      executionTruthy: [],
      executionFalsy: [],
      noFalsy: false
    }
  }
})
const emits = defineEmits(['update:modelValue'])

const refreshKey = ref(new Date().getTime())
const conditions = reactive<ConditionsItem[]>([{ ...blankCondition, onAdd: addCondition }])

const type = computed({
  set: (type) => emits('update:modelValue', { ...props.modelValue, type }),
  get: () => props.modelValue.type || undefined
})

watch(conditions, (conditions) => {
  emits('update:modelValue', { ...props.modelValue, conditions })
})

function addCondition() {
  conditions.push({ ...blankCondition, onRemove: removeCondition })
}

function removeCondition(index: number) {
  conditions.splice(index, 1)
  refreshKey.value = new Date().getTime()
}

function removeFalsy() {
  emits('update:modelValue', { ...props.modelValue, noFalsy: true, falsy: [] })
}

function addFalsy() {
  emits('update:modelValue', { ...props.modelValue, noFalsy: false, falsy: [] })
}
</script>
