<script setup lang="ts">
import { watch, ref, reactive, computed } from 'vue';
import { createUser, getRoles, updateUser } from '@/services/sys'
import { useNotifierStore } from '@/store/app';
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs';
import JSEncrypt from 'jsencrypt';
import { getPublicKey } from '@/services/auth';

export interface Props {
  modelValue: boolean,
  editing: UserVO | null
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'reload'])

const notifier = useNotifierStore()

const form = reactive({
  id: '',
  name: '',
  email: '',
  password: '',
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

    if (props.editing) {
      Object.assign(form, { ...props.editing, roles: props.editing.roles.map(r => r.id) })
    }
  }
})

async function submit(event: SubmitEventPromise) {
  const { valid } = await event
  if (valid) {
    submitting.value = true
    let response;

    if (!props.editing) {
      const encrypt = new JSEncrypt()
      const pubKey = await getPublicKey()
      encrypt.setPublicKey(pubKey)

      response = await createUser(form.name, form.email, encrypt.encrypt(form.password) as string, form.roles)
    } else {
      response = await updateUser(form.id, form.name, form.email, form.roles)
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
      <v-card-title>{{ props.editing ? '编辑' : '新增' }}用户</v-card-title>
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-container class="pa-0 pt-2">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.name" :rules="[val => !!val || '用户名不可为空']"
                  label="用户名*"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field v-model="form.email"
                  :rules="[val => !!val || '邮箱不可为空', val => /.+@.+\..+/.test(val) || '请输入有效的邮箱']"
                  label="邮箱*"></v-text-field>
              </v-col>

              <v-col cols="12" v-if="!props.editing">
                <v-text-field v-model="form.password" :rules="[val => !!val || '密码不可为空']" label="密码*"
                  type="password"></v-text-field>
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