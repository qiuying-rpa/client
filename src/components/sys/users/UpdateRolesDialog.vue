<script setup lang="ts">
import { watch, ref, reactive, computed } from 'vue';
import { addUsersRoles, getRoles, removeUsersRoles } from '@/services/sys'
import { useNotifierStore } from '@/store/app';
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs';

export interface Props {
  modelValue: boolean,
  updating: readonly UserVO[],
  action: 'add' | 'remove'
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'reload'])

const notifier = useNotifierStore()

const form = reactive({
  roles: []
})

const roles = ref<RoleVO[]>([])
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
    roles.value = (await getRoles()).data
  }
})

async function submit(event: SubmitEventPromise) {
  const { valid } = await event
  if (valid) {
    submitting.value = true
    let response;
    const userIds = props.updating.map(u => u.id)

    if (props.action === 'add') {
      response = await addUsersRoles(userIds, form.roles)
    } else {
      response = await removeUsersRoles(userIds, form.roles)
    }

    if (response.code === 0) {
      notifier.pushNotification('更新成功', 'success')
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
      <v-card-title>批量{{ props.action === 'add' ? '分配' : '回收' }}角色</v-card-title>
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-container class="pa-0 pt-2">
            <v-row>
              <v-col cols="12">
                <v-textarea :model-value="props.updating.map(u => u.name).join('、')" label="已选用户"
                  required multiple variant="outlined" readonly density="compact"></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-autocomplete v-model="form.roles" label="角色" required multiple :items="roles"
                  item-title="name" item-value="id"></v-autocomplete>
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