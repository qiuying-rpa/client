<template>
  <div class="h-100vh flex overflow-hidden">
    <div class="w-15% pa-1 box-border b-r-1 b-r-solid b-gray-200 overflow-overlay h-100% shrink-0">
      <v-list density="compact" nav>
        <v-list-item v-for="nav in navMenus" :key="nav.path" :to="getFullPath(nav)">
          <div class="items-center flex">
            <v-icon size="16" class="mr-2">{{ nav.meta?.icon || '' }}</v-icon>
            <v-list-item-title>{{ nav.name }}</v-list-item-title>
          </div>
        </v-list-item>
      </v-list>
    </div>
    <v-main class="pa-0 overflow-auto w-85%">
      <router-view />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { RouteRecordRaw } from 'vue-router';
import { useRouter } from 'vue-router';

const ROUTE_PREFIX = '/system'

const { menus } = useAppStore()
const navMenus = (useRouter().getRoutes().find(r => r.path === ROUTE_PREFIX)?.children || []).filter(r => menus.some(m => getFullPath(r) === m))

function getFullPath(route: RouteRecordRaw) {
  return route.path.startsWith('/') ? route.path : `${ROUTE_PREFIX}/${route.path}`
}
</script>