<template>
  <v-container class="flex items-center justify-center h-100% w-100%">
    <v-card color="transparent" class="w-30rem xl:w-25rem" flat>
      <v-card-text class="flex justify-center pa-0">
        <div class="flex items-center text-h4 fw-500">
          <v-img src="qiuying.svg" width="64" class="flex-grow-0 mr-6" />
          Qiuying RPA
        </div>
      </v-card-text>
      <v-form class="mt-2.8rem">
        <v-row>
          <v-col cols="12">
            <v-text-field label="用户名" variant="outlined" density="comfortable"
              :rules="[val => !!val || '用户名不可为空']" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="密码" type="password" variant="outlined" density="comfortable"
              :rules="[val => !!val || '用户名不可为空']" />
          </v-col>
        </v-row>
      </v-form>
      <v-card-text class="text-center pa-0">
        <div class="flex justify-between py-0 items-center">
          <v-checkbox label="保持登录" density="comfortable" color="primary" hide-details />
          <v-btn variant="plain" class="px-0" color="primary">忘记密码？</v-btn>
        </div>
        <div class="my-1rem">
          <v-btn color="primary" block flat @click="submit">登录</v-btn>
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
import { useNotifierStore } from '@/store/app';

const { pushNotification } = useNotifierStore()

function submit() {
  pushNotification('Saved.', 'loading')
}
</script>