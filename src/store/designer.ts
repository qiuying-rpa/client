import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useDesignerStore = defineStore('designer', () => {
  const variables = reactive<{ [key: string]: string[] }>({})


  function setVariables (processId: string, variable: string) {
    if (variables[processId]) {
      if (variables[processId].includes(variable)) {
        variables[processId] = variables[processId].filter(v => v !== variable)
      } else {
        variables[processId].push(variable)
      }
    } else {
      variables[processId] = [variable]
    }
  }

  return { variables, setVariables }
})