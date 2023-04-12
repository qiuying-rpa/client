<template>
  <v-container class="flex items-center justify-center h-100% w-100%">
    <v-card color="transparent" class="w-30rem xl:w-25rem" flat>
      <v-card-text class="flex justify-center pa-0">
        <div class="flex items-center text-h4 fw-500">
          <v-img src="qiuying.svg" width="64" class="flex-grow-0 mr-6" />
          Qiuying RPA
        </div>
      </v-card-text>
      <v-alert variant="text" closable :model-value="!!invalidMessage[0]"
        :color="invalidMessage[0] === 'error' ? 'error' : 'warning'" :text="invalidMessage[1]"
        class="mt-2.8rem" />
      <v-form class="mt-2.8rem" @submit.prevent>
        <v-row>
          <v-col cols="12">
            <v-text-field label="用户名" variant="outlined" density="comfortable" v-model="form.username"
              :rules="[val => !!val || '用户名不可为空']" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="密码" type="password" variant="outlined" density="comfortable"
              v-model="form.password" :rules="[val => !!val || '密码不可为空']" />
          </v-col>
        </v-row>
      </v-form>
      <v-card-text class="text-center pa-0">
        <div class="flex justify-between py-0 items-center">
          <v-checkbox label="保持登录" density="comfortable" color="primary" hide-details />
          <v-btn variant="plain" class="px-0" color="primary" v-model="form.rememberMe">忘记密码？</v-btn>
        </div>
        <div class="my-1rem">
          <v-btn color="primary" block flat type="submit">登录</v-btn>
        </div>
        <div class="pa-0 flex items-center" cols="12">
          <div>还没有账号？</div>
          <v-btn variant="plain" class="px-0" color="primary">注册一个</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { SubmitEventPromise } from 'vuetify'
import { reactive, ref } from 'vue'
import { getPublicKey, getToken } from '@/api/auth'
import JSEncrypt from 'jsencrypt'
import { useRouter } from 'vue-router'
import { setToken } from '@/utils/auth'

const form = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const invalidMessage = ref<['error' | 'warning' | '', string]>(['', ''])
const submitting = ref(false)

async function submit(event: SubmitEventPromise) {
  const { valid } = await event
  if (valid) {
    submitting.value = true
    const encrypt = new JSEncrypt()
    const { data: pubKey } = await getPublicKey()
    encrypt.setPublicKey(pubKey)
    const { code, data: { access_token, refresh_token } } = await getToken(form.username, encrypt.encrypt(form.password) as string)
    submitting.value = false

    if (code === 0) {
      setToken(access_token, refresh_token, form.rememberMe)
      useRouter().push('/')
    } else {
      invalidMessage.value[0] = 'error'
      invalidMessage.value[1] = '用户名或密码错误'
    }
  } else {
    invalidMessage.value[0] = 'warning'
    invalidMessage.value[1] = '请确保输入有效'
  }
}
</script>