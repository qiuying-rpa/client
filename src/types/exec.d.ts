interface ConditionItem {
  left: string
  middle: string
  right: string
}

type ConditionsItem = ConditionItem & {
  onAdd?: () => void
  onRemove?: (i: number) => void
}

type ProcessNodeModelValue = { [key: string]: unknown }

interface ProcessNode {
  id: string
  is: string
  modelValue?: ProcessNodeModelValue
}