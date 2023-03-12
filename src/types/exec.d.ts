interface ConditionItem {
  left: string
  middle: string
  right: string
}

type ProcessNodeModelValue = { [key: string]: unknown }

interface ProcessNode {
  id: string
  is: string
  modelValue: ProcessNodeModelValue
}