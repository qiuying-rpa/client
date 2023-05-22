<template>
  <v-navigation-drawer rail permanent>
    <v-list-item nav class="pa-2 text-center">
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" flat>
            <v-avatar ref="avatarRef" size="small" />
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item @click="signOut" class="text-red">
            <v-list-item-title>登出</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item>

    <v-divider />

    <v-list density="compact" nav modelValue="designer">
      <template v-for="{ name, path, icon } in navMenus">
        <v-list-item :prepend-icon="icon" :key="path" :title="name" v-if="menus.includes(path)"
          :active="router.currentRoute.value.path.includes(path)" :to="path" />
      </template>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { removeToken } from '@/utils/auth'
import multiavatar from '@multiavatar/multiavatar'
import { ComponentPublicInstance } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const { menus, userInfo } = useAppStore()
const router = useRouter()
const navRoutes = router.getRoutes().filter(r => r.meta.tags?.includes('nav'))
const avatarRef = ref<ComponentPublicInstance | null>(null)
const navMenus = ref((navRoutes).map(({ name, path, meta }) => ({ name: name as string, path, icon: meta?.icon, order: (typeof (meta.order) === 'number' ? meta.order : Infinity) })).sort((a, b) => a.order - b.order))

onMounted(() => {
  if (avatarRef.value) {
    const avatar = multiavatar(userInfo?.name || 'qiuying')
    avatarRef.value.$el.innerHTML = avatar
  }
})

function signOut() {
  removeToken()
  router.push('/')
}
</script>