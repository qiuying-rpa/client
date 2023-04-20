<template>
  <v-list density="compact" nav modelValue="designer">
    <template v-for="{ title, value, icon, children, onDrag } in items" :key="value">
      <v-list-item v-if="!children" :value="value" :draggable="!!onDrag" @dragstart.stop="onDrag"
        :ripple="!onDrag">
        <div class="flex items-center select-none" :title="title">
          <v-icon size="16" class="mr-2">{{ icon }}</v-icon>
          <v-list-item-title>{{ title }}</v-list-item-title>
        </div>
      </v-list-item>
      <v-list-group v-else :value="value">
        <template #activator="{ props }">
          <v-list-item v-bind="props" :value="value">
            <div class="flex items-center select-none" :title="title">
              <v-icon size="16" class="mr-2">{{ icon }}</v-icon>
              <v-list-item-title>{{ title }}</v-list-item-title>
            </div>
            <template #append="{ isActive }">
              <v-icon icon="mdi-chevron-up" size="small" v-if="isActive" />
              <v-icon icon="mdi-chevron-down" v-else size="small" />
            </template>
          </v-list-item>
        </template>

        <v-list-item v-for="{ title, value, icon, onDrag } in children" :key="value" :value="value"
          :draggable="!!onDrag" @dragstart.stop="onDrag" :ripple="!onDrag">
          <div class="flex items-center select-none" :title="title">
            <v-icon size="16" class="mr-2">{{ icon }}</v-icon>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </div>
        </v-list-item>
      </v-list-group>
    </template>
  </v-list>
</template>

<script setup lang="ts">
export interface Props {
  items: TreeItem[]
}

withDefaults(defineProps<Props>(), {
  items: () => []
})
</script>