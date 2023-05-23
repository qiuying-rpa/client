<script setup lang="ts">
import { watch, ref, reactive, computed } from 'vue';
import { createRole, updateRole } from '@/services/sys'
import { useNotifierStore } from '@/store/app';
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs';

export interface Props {
  modelValue: boolean,
  updating: RoleVO | null
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'reload'])

const notifier = useNotifierStore()

const form = reactive({
  name: '',
  desc: ''
})

const submitting = ref(false)

const dialog = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

watch(dialog, async (val) => {
  if (val) {
    if (props.updating) {
      Object.assign(form, { ...props.updating })
    }
  }
})

async function submit(event: SubmitEventPromise) {
  const { valid } = await event
  if (valid) {
    submitting.value = true
    let response;

    if (!props.updating) {
      response = await createRole(form.name, form.desc)
    } else {
      response = await updateRole(props.updating.id, form.name, form.desc)
    }

    if (response.code === 0) {
      notifier.pushNotification('保存成功', 'success')
      dialog.value = false
      emits('reload')
    } else {
      notifier.pushNotification(response.message, 'warn')
    }

    submitting.value = false
  } else {
    notifier.pushNotification('请确保输入有效', 'warn')
  }
}
</script>

<template>
  <v-dialog v-model="dialog" class="w-30rem lg:w-40rem">
    <v-card class="rounded-lg">
      <v-card-title>{{ props.updating ? '编辑' : '新增' }}角色</v-card-title>
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-container class="pa-0 pt-2">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.name" :rules="[val => !!val || '角色名不可为空']"
                  label="角色名*"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea variant="outlined" density="compact" v-model="form.desc"
                  label="描述"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-end pr-4">
          <v-btn @click="dialog = false" variant="tonal" class="mr-2">取消</v-btn>
          <v-btn color="primary" type="submit" :loading="submitting" variant="flat">保存</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>