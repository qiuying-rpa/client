<template>
  <div>
    <node-shell>
      <plain-card class="relative select-none" @remove="$attrs.onRemove">
        <div class="flex items-center">
          如果满足
          <q-select class="inline-block mx-1" :items="[
            {
              title: '全部条件',
              value: 'all'
            },
            {
              title: '任意条件',
              value: 'any'
            }
          ]" v-model="conditionType" />
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
          <plain-card class="relative select-none" @mouseover="showButton"
            @mouseout="delayHideButton">
            则执行
            <div class="rd-50% absolute top-50% right--6 translate-y--50% bg-gray-3"
              @mouseover="showButton" v-if="props.modelValue.noFalsy && addFalsyButton">
              <icon-button icon="i-mdi-plus text-xs" @click="addFalsy" />
            </div>
          </plain-card>
          <div class="bg-slate grow-1 h-0.4" v-if="!props.modelValue.noFalsy" />
        </div>
        <div class="pl-8">
          <exec-sequential class="py-4 before-top-0" :modelValue="props.modelValue.truthy || []"
            @update:modelValue="emits('update:modelValue', { ...props.modelValue, truthy: $event })" />
        </div>
      </div>
      <div v-if="!props.modelValue.noFalsy">
        <div class="pt-4">
          <plain-card class="relative select-none" @remove="removeFalsy">
            否则执行
          </plain-card>
        </div>
        <div class="pl-8">
          <exec-sequential class="py-4 before-top-0" :modelValue="props.modelValue.falsy || []"
            @update:modelValue="emits('update:modelValue', { ...props.modelValue, falsy: $event })" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

interface Props {
  modelValue?: {
    conditionType: 'any' | 'all'
    conditions: ConditionItem[]
    truthy: ProcessNode[]
    falsy: ProcessNode[]
    noFalsy: boolean
  }
}

const blankCondition = {
  left: '',
  middle: '',
  right: ''
}

type ConditionsItem = ConditionItem & {
  onAdd?: () => void
  onRemove?: (i: number) => void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue () {
    return {
      conditionType: 'all',
      conditions: [],
      truthy: [],
      falsy: [],
      noFalsy: false
    }
  }
})
const emits = defineEmits(['update:modelValue'])

const refreshKey = ref(new Date().getTime())
const addFalsyButton = ref(false)
const hideButtonTimerHandle = ref<NodeJS.Timeout | null>(null)
const conditions = reactive<ConditionsItem[]>([{ ...blankCondition, onAdd: addCondition }])

const conditionType = computed({
  set: (conditionType) => emits('update:modelValue', { ...props.modelValue, conditionType }),
  get: () => props.modelValue.conditionType
})

function addCondition () {
  conditions.push({ ...blankCondition, onRemove: removeCondition })
}

function removeCondition (index: number) {
  conditions.splice(index, 1)
  refreshKey.value = new Date().getTime()
}

function delayHideButton () {
  hideButtonTimerHandle.value = setTimeout(() => {
    addFalsyButton.value = false
    hideButtonTimerHandle.value = null
  }, 370)
}

function showButton () {
  if (hideButtonTimerHandle.value) {
    clearTimeout(hideButtonTimerHandle.value)
    hideButtonTimerHandle.value = null
  }
  addFalsyButton.value = true
}

function removeFalsy () {
  emits('update:modelValue', { ...props.modelValue, noFalsy: true, falsy: [] })
}

function addFalsy () {
  emits('update:modelValue', { ...props.modelValue, noFalsy: false, falsy: [] })
}
</script>
