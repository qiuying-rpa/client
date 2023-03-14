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
          <kwargs-form :modelValue="[
            {
              label: '访问目标',
              argName: 'target',
              value: ''
            },
            {
              label: '嵌套',
              argName: 'nested',
              value: [
                {
                  label: '索引',
                  argName: 'index',
                  value: ''
                },
                {
                  label: '索引',
                  argName: 'index',
                  value: ''
                },
                {
                  label: '数组',
                  argName: 'array',
                  value: [
                    [
                      {
                        label: '选择',
                        argName: 'select',
                        value: '',
                        options: [
                          { title: 'foo', value: 'bar' }
                        ]
                      },
                      {
                        label: '选择',
                        argName: 'select',
                        value: '',
                        options: [
                          { title: 'foo', value: 'bar' }
                        ]
                      }
                    ],
                    [
                      {
                        label: '选择',
                        argName: 'select',
                        value: '',
                        options: [
                          { title: 'foo', value: 'bar' }
                        ]
                      },
                      {
                        label: '选择',
                        argName: 'select',
                        value: ''
                      }
                    ]
                  ]
                }
              ]
            },
          ]" />
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
import { computed } from 'vue'

interface Props {
  modelValue?: {
    circulationType: string
    circulationBody: ProcessNode[]
  }
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const circulationType = computed({
  set: (circulationType) => emits('update:modelValue', { ...props.modelValue, circulationType }),
  get: () => props.modelValue?.circulationType
})
</script>
