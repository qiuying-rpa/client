<template>
  <div>
    <node-shell>
      <plain-card class="relative">
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
          ]" v-model="conditionLimit" />
          <dot-form>
            <condition-item :modelValue="condition"
              @update:modelValue="Object.assign(conditions[index], $event)"
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
          <plain-card class="reactive"> 则执行 </plain-card>
          <div class="bg-slate grow-1 h-0.4" />
        </div>
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
      <div>
        <div class="pt-4">
          <plain-card> 否则执行 </plain-card>
        </div>
        <div class="pl-8">
          <div
            class="pl-8 py-4 relative before-content-none before-w-0.4 before-h-100% before-absolute before-left-0 before-bg-slate w-fit before-top-0">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const blankCondition = {
  left: '',
  middle: '',
  right: ''
}

type ConditionsItem = ConditionItem & {
  onAdd?: () => void
  onRemove?: (i: number) => void
}

const conditionLimit = ref('')
const refreshKey = ref(new Date().getTime())
const conditions = reactive<ConditionsItem[]>([{ ...blankCondition, onAdd: addCondition }])

function addCondition () {
  conditions.push({ ...blankCondition, onRemove: removeCondition })
}

function removeCondition (index: number) {
  conditions.splice(index, 1)
  refreshKey.value = new Date().getTime()
}
</script>
