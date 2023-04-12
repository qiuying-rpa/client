<template>
  <v-navigation-drawer permanent>
    <v-list density="compact" nav modelValue="designer">
      <v-list-item prepend-icon="mdi-account-outline" value="用户管理" />
      <v-list-item prepend-icon="mdi-account-key-outline" value="角色管理" />
    </v-list>
  </v-navigation-drawer>

  <router-view />
</template>