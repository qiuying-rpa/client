import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useDesignerStore = defineStore('designer', () => {
  const variables = reactive<{ [key: string]: string[] }>({})

  function setVariable (processId: string, variable: string) {
    if (variables[processId]) {
      if (!variables[processId].includes(variable)) {
        variables[processId].push(variable)
      }
    } else {
      variables[processId] = [variable]
    }
  }

  function unsetVariable (processId: string, variable: string) {
    if (variables[processId]) {
      variables[processId] = variables[processId].filter(v => v !== variable)
    }
  }

  return { variables, setVariable, unsetVariable }
})