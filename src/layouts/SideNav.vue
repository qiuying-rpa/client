<template>
  <v-navigation-drawer rail permanent>
    <v-list-item nav class="pa-2 text-center">
      <v-avatar ref="avatarRef" size="36" />
    </v-list-item>

    <v-divider />

    <v-list density="compact" nav modelValue="designer">
      <v-list-item prepend-icon="mdi-format-list-bulleted" value="projects" />
      <v-list-item prepend-icon="mdi-pencil-ruler" value="designer" />
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import multiavatar from '@multiavatar/multiavatar'
import { ComponentPublicInstance } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const avatarRef = ref<ComponentPublicInstance | null>(null)

onMounted(() => {
  if (avatarRef.value) {
    const avatar = multiavatar('allen-tao')
    avatarRef.value.$el.innerHTML = avatar
  }
})
</script>