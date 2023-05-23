<script setup lang="ts">
import { computed, ref } from 'vue';
import { deleteUsers } from '@/services/sys'
import { useNotifierStore } from '@/store/app';

export interface Props {
  modelValue: boolean
  deleting: readonly UserVO[]
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'reload'])

const notifier = useNotifierStore()

const submitting = ref(false)

const dialog = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

async function submit() {
  submitting.value = true
  await deleteUsers(props.deleting.map(u => u.id))
  notifier.pushNotification('删除成功', 'success')
  dialog.value = false
  submitting.value = false
  emits('reload')
}
</script>

<template>
  <v-dialog v-model="dialog" class="w-30rem lg:w-40rem">
    <v-card class="rounded-lg">
      <v-card-title>删除确认</v-card-title>
      <v-form @submit.prevent="submit">
        <v-card-text class="flex items-center">
          <v-icon size="small" color="warning" class="mr-2">mdi-alert-circle</v-icon>确认删除这{{
            props.deleting.length > 1 ? `
          ${props.deleting.length} ` :
            '' }}个用户？
        </v-card-text>
        <v-card-text>
          <v-textarea :model-value="props.deleting.map(u => u.name).join('、')" label="已选用户" required
            multiple variant="outlined" readonly density="compact"></v-textarea>
        </v-card-text>
        <v-card-actions class="justify-end pr-4">
          <v-btn @click="dialog = false" variant="tonal" class="mr-2">取消</v-btn>
          <v-btn color="primary" type="submit" :loading="submitting" variant="flat">确认</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>