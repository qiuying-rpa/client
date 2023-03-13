import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useVariablesStore = defineStore('variable', () => {
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

export const useDraggingStore = defineStore('dragging', () => {
  const dragging = ref('')

  function setDragging (draggingComponent: string) {
    dragging.value = draggingComponent
  }

  return { dragging, setDragging }
})

export const useDraggingOverStore = defineStore('dragging-over', () => {
  const draggingOver = ref('')

  function setDraggingOver (draggingOverSequence: string) {
    draggingOver.value = draggingOverSequence
  }

  return { draggingOver, setDraggingOver }
})