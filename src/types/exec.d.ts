interface ConditionItem {
  left: string
  middle: string
  right: string
}

type ConditionsItem = ConditionItem & {
  onAdd?: () => void
  onRemove?: (i: number) => void
}

type ProcessNodeModelValue = ObjectValue

interface ProcessNode {
  id: string
  is: string
  title?: string
  modelValue?: ProcessNodeModelValue
}