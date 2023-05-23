<script setup lang="ts">
import { ref } from 'vue';
import { getRoles, getRole, updateRolePermissions } from '@/services/sys'
import { nextTick, computed, watchEffect, watch } from 'vue';
import CreateUpdateDialog from '@/components/sys/roles/CreateUpdateDialog.vue';
import DeleteConfirmDialog from '@/components/sys/roles/DeleteConfirmDialog.vue';
import { useRouter } from 'vue-router';
import { useNotifierStore } from '@/store/app';

const columns: {
  title: string,
  value: string
}[] = [
    {
      title: '名称',
      value: 'name'
    },
    {
      title: '访问权限',
      value: 'path'
    },
    {
      title: '操作权限',
      value: 'actions'
    },
  ]

const menusToAuthorize = useRouter().getRoutes().filter(r => r.meta.tags?.includes('menu'))
const notifier = useNotifierStore()

const roleList = ref<RoleVO[]>([])
const loading = ref(false)
const search = ref('')
const currentRole = ref<string[]>([])
const selected = ref<readonly RoleVO[]>([])
const selectedPermissions = ref<string[]>([])
const dialogKey = ref(new Date().getTime())
const dialogCreateUpdate = ref(false)
const updatingRole = ref<RoleVO | null>(null)
const deletingRole = ref<RoleVO | null>(null)
const dialogDeleteConfirm = ref(false)
const dialogUpdateRoles = ref(false)

const listDisplay = computed(() => roleList.value.filter(u => (u.name + u.desc).includes(search.value)))

watch(() => dialogCreateUpdate.value || dialogDeleteConfirm.value || dialogUpdateRoles.value, (val) => {
  if (!val) {
    nextTick(() => {
      updatingRole.value = null
      deletingRole.value = null
      dialogKey.value = new Date().getTime()
    })
  }
})

watch(currentRole, ([id]) => {
  getRoleDetails(id)
})

watchEffect(() => {
  getList()
})

async function getList() {
  loading.value = true
  roleList.value = (await getRoles()).data

  selected.value = selected.value.filter(s => roleList.value.some(r => r.id === s.id))

  nextTick(() => {
    loading.value = false
  })
}

async function getRoleDetails(roleId: string) {
  const roleDetails = (await getRole(roleId)).data
  selectedPermissions.value = Object.entries(roleDetails.permissions || {}).reduce((pre, [key, value]) => pre.concat(value.map((v: string) => key.slice(0, -1) + ':' + v)), [])
}

async function savePermissions() {
  if (currentRole.value.length) {
    const [roleId] = currentRole.value
    notifier.pushNotification('正在保存..', 'loading')
    const response = await updateRolePermissions(roleId, selectedPermissions.value.reduce((pre, curr) => {
      if (curr.startsWith('menu:')) {
        pre.menus.push(curr.replace('menu:', ''))
      } else if (curr.startsWith('action:')) {
        pre.actions.push(curr.replace('action:', ''))
      }
      return pre
    }, { menus: [] as string[], actions: [] as string[] }))

    if (response.code === 0) {
      notifier.shiftNotification()
      notifier.pushNotification('保存成功', 'success')
    } else {
      notifier.pushNotification(response.message, 'warn')
    }
  } else {
    notifier.pushNotification('当前未选中任何角色:/', 'info')
  }
}
</script>

<template>
  <div class="h-100% w-100% flex overflow-hidden">
    <div class="b-r-1 b-gray-200 b-r-solid w-25% pa-4 box-border overflow-auto">
      <div class="flex flex-col h-100%">
        <div class="flex items-center">
          <v-btn color="primary" class="mr-2" flat prepend-icon="mdi-plus"
            @click="dialogCreateUpdate = true">新增</v-btn>
          <v-btn color="error" flat prepend-icon="mdi-delete-outline"
            @click="dialogDeleteConfirm = true" :disabled="selected.length === 0">
            删除
            <span v-if="selected.length">({{ selected.length }})</span>
          </v-btn>
        </div>
        <div class=" mt-4">
          <v-text-field variant="outlined" prepend-inner-icon="mdi-magnify" hide-details single-line
            v-model="search" placeholder="输入关键词以搜索" clearable />
        </div>
        <v-card class="mt-4 b-solid b-1 b-gray-200 rd-2 pa-2 grow-1 overflow-auto" flat>
          <v-list class="pa-0" v-model:selected="currentRole">
            <v-list-item :value="role.id" v-for="role in listDisplay" :key="role.id" class="px-0">
              <template #prepend>
                <v-checkbox-btn v-model="selected" :value="role" color="primary" @click.stop
                  class="px-0" :disabled="role.is_default"></v-checkbox-btn>
              </template>
              <v-list-content>
                <v-list-item-title class="text-sm">{{ role.name }}</v-list-item-title>
                <v-list-item-subtitle :title="role.desc">{{ role.desc || '无描述' }}
                </v-list-item-subtitle>
              </v-list-content>
              <template #append>
                <v-btn icon size="small" variant="text"
                  @click="updatingRole = role; dialogCreateUpdate = true" :disabled="role.is_default">
                  <v-icon color="primary">mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn icon size="small" variant="text"
                  @click="deletingRole = role; dialogDeleteConfirm = true"
                  :disabled="role.is_default">
                  <v-icon color="error">mdi-delete-outline</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
    <div class="grow-1 box-border overflow-auto pa-4">
      <div class="flex flex-col h-100%">
        <div class="flex items-center justify-end">
          <v-btn variant="tonal" color="primary" class="mr-2" flat
            prepend-icon="mdi-content-save-outline" @click="savePermissions">保存</v-btn>
          <v-btn variant="tonal" color="primary" prepend-icon="mdi-refresh"
            @click="currentRole[0] && getRoleDetails(currentRole[0])">
            重置
          </v-btn>
        </div>
        <div class="w-100% px-4 box-border b-solid b-1 b-gray-200 rd-2 relative grow-1 mt-4">
          <div v-if="currentRole.length">
            <v-table class="min-h-800px text-sm">
              <thead>
                <tr>
                  <th v-for="column in columns" :key="column.value">
                    {{ column.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="menu in menusToAuthorize" :key="menu.path" class="hover:bg-gray-50">
                  <td>{{ menu['name'] }}</td>
                  <td>
                    <v-checkbox-btn color="primary" v-model="selectedPermissions"
                      :label="menu['path']" :value="'menu:' + menu['path']"></v-checkbox-btn>
                  </td>
                  <td class="flex">
                    <v-checkbox-btn v-for="action in menu.meta.actions || []" :key="action.value"
                      :label="action.title" :value="'action:' + action.value"
                      v-model="selectedPermissions" color="primary"></v-checkbox-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <v-overlay contained :model-value="loading" class="flex items-center justify-center">
              <v-progress-circular indeterminate color="primary" />
            </v-overlay>
          </div>
          <div v-else class="flex items-center h-100% justify-center">
            <span class="text-caption">选中某个角色，进行权限绑定</span>
          </div>
        </div>
      </div>
    </div>

  </div>

  <create-update-dialog v-model="dialogCreateUpdate" @reload="getList" :key="dialogKey"
    :updating="updatingRole" />
  <delete-confirm-dialog v-model="dialogDeleteConfirm" @reload="getList" :key="dialogKey"
    :deleting="deletingRole ? [deletingRole] : selected" />
</template>