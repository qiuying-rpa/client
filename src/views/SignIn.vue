<template>
  <v-container class="flex items-center justify-center h-100% w-100%">
    <v-card color="transparent" class="w-30rem xl:w-25rem" flat>
      <v-card-text class="flex justify-center pa-0">
        <div class="flex items-center text-h4 fw-500 mb-1.4rem">
          <v-img src="qiuying.svg" width="64" class="flex-grow-0 mr-6" />
          秋英 RPA
        </div>
      </v-card-text>
      <v-alert closable :type="invalidMessage[0]" :text="invalidMessage[1]" rounded="lg"
        :color="invalidMessage[0] === 'error' ? '#dc2626' : '#d97706'" variant="tonal"
        v-model="invalidAlert" />
      <v-form @submit.prevent="submit" class="mt-1.4rem">
        <v-row>
          <v-col cols="12">
            <v-text-field label="邮箱" variant="outlined" density="comfortable" v-model="form.email"
              :rules="[val => !!val || '邮箱不可为空', val => /.+@.+\..+/.test(val) || '请输入有效的邮箱地址']" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="密码" type="password" variant="outlined" density="comfortable"
              v-model="form.password" :rules="[val => !!val || '密码不可为空']" />
          </v-col>
        </v-row>
        <v-card-text class="text-center pa-0">
          <div class="flex justify-between py-0 items-center">
            <v-checkbox label="保持登录" density="comfortable" color="primary" hide-details
              v-model="form.rememberMe" />
            <v-btn variant="plain" class="px-0" color="primary">忘记密码？</v-btn>
          </div>
          <div class="my-1rem">
            <v-btn color="primary" block flat type="submit" :loading="submitting">登录</v-btn>
          </div>
          <div class="pa-0 flex items-center" cols="12">
            <div>还没有账号？</div>
            <v-btn variant="plain" class="px-0" color="primary">注册一个</v-btn>
          </div>
        </v-card-text>
      </v-form>
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
import { computed } from 'vue'

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const invalidMessage = ref<['error' | 'warning' | undefined, string]>([undefined, ''])
const submitting = ref(false)
const router = useRouter()

const invalidAlert = computed({
  get: () => !!invalidMessage.value[0],
  set: () => Object.assign(invalidMessage.value, [undefined, ''])
})

async function submit(event: SubmitEventPromise) {
  const { valid } = await event
  if (valid) {
    submitting.value = true
    const encrypt = new JSEncrypt()
    const pubKey = await getPublicKey()
    encrypt.setPublicKey(pubKey)

    const { code, data } = await getToken(form.email, encrypt.encrypt(form.password) as string)
    submitting.value = false

    if (code === 0) {
      const { access_token, refresh_token } = data
      setToken(access_token, refresh_token, form.rememberMe)
      router.push('/')
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