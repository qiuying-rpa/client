interface KwargsFormModelValue {
  label: string
  argName: string
  value: string | KwargsFormModelValue[] | KwargsFormModelValue[][]
  options?: SimpleItem[]
}