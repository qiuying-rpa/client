interface ConditionItem {
  left: string
  middle: string
  right: string
}

type ConditionsItem = ConditionItem & {
  onAdd?: () => void
  onRemove?: (i: number) => void
}

type ProcessNodeModelValue = ObjectValue | CommonArgItem[]

interface ProcessNode {
  id: string
  is: string
  title?: string
  modelValue?: ProcessNodeModelValue
}

interface RunnableNode {
  id: string
  func: string
  kwargs: ObjectValue
}

interface CommonArgItem {
  label: string
  argName: string
  value: string | CommonArgItem[] | CommonArgItem[][]
  options?: SimpleItem[]
}