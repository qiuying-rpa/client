<script setup lang="ts">
import { ref } from 'vue';
import { getUsers } from '@/services/sys'
import { nextTick, computed, watchEffect, watch } from 'vue';
import CreateUpdateDialog from '@/components/sys/users/CreateUpdateDialog.vue';
import DeleteConfirmDialog from '@/components/sys/users/DeleteConfirmDialog.vue';
import UpdateRolesDialog from '@/components/sys/users/UpdateRolesDialog.vue';

type UpdateRolesAction = 'add' | 'remove'

const columns: {
  title: string,
  value: keyof UserVO
}[] = [
    {
      title: '名称',
      value: 'name'
    },
    {
      title: '邮箱',
      value: 'email'
    },
    {
      title: '角色',
      value: 'roles'
    },
  ]

const userList = ref<UserVO[]>([])
const loading = ref(false)
const search = ref('')
const selected = ref<readonly UserVO[]>([])
const dialogKey = ref(new Date().getTime())
const dialogCreateUpdate = ref(false)
const updatingUser = ref<UserVO | null>(null)
const deletingUser = ref<UserVO | null>(null)
const dialogDeleteConfirm = ref(false)
const dialogUpdateRoles = ref(false)
const updateRolesAction = ref<UpdateRolesAction>('add')


const listDisplay = computed(() => userList.value.filter(u => (u.email + u.name + u.roles.map(r => r.name).join('')).includes(search.value)))

watch(() => dialogCreateUpdate.value || dialogDeleteConfirm.value || dialogUpdateRoles.value, (val) => {
  if (!val) {
    nextTick(() => {
      updatingUser.value = null
      deletingUser.value = null
      dialogKey.value = new Date().getTime()
    })
  }
})

watchEffect(() => {
  getList()
})

async function getList() {
  loading.value = true
  userList.value = (await getUsers()).data
  nextTick(() => {
    loading.value = false
  })
}

function selectAll() {
  if (selected.value.length !== userList.value.length) {
    selected.value = userList.value
  } else {
    selected.value = []
  }
}

function toUpdateRoles(action: UpdateRolesAction) {
  updateRolesAction.value = action
  dialogUpdateRoles.value = true
}
</script>

<template>
  <div class="h-100% w-100% pa-4 box-border overflow-auto">
    <div class="flex flex-col h-100%">
      <div class="flex items-center justify-center">
        <v-btn color="primary" flat prepend-icon="mdi-plus"
          @click="dialogCreateUpdate = true">新增</v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="secondary" v-bind="props" class="ml-4" flat append-icon="mdi-menu-down"
              prepend-icon="mdi-account-group" :disabled="selected.length === 0">批量操作</v-btn>
          </template>
          <v-list density="compact">
            <v-list-item @click="toUpdateRoles('add')" class="text-caption">分配角色</v-list-item>
            <v-list-item @click="toUpdateRoles('remove')" class="text-caption">回收角色</v-list-item>
            <v-list-item class="c-red text-caption"
              @click="dialogDeleteConfirm = true">删除</v-list-item>
          </v-list>
        </v-menu>
        <div class="text-caption ml-4" v-if="selected.length">{{ selected.length }} 项已选中</div>
        <v-spacer />
        <div class="w-17rem">
          <v-text-field variant="outlined" prepend-inner-icon="mdi-magnify" hide-details single-line
            v-model="search" placeholder="输入关键词以搜索" clearable />
        </div>
      </div>
      <div class="w-100% px-4 box-border b-solid b-1 b-gray-200 mt-4 rd-2 relative grow-1">
        <v-table class="text-sm">
          <thead>
            <tr>
              <th><v-checkbox-btn color="primary" @click="selectAll"
                  :disabled="userList.length === 0"></v-checkbox-btn></th>
              <th v-for="column in columns" :key="column.value">
                {{ column.title }}
              </th>
              <th class="pl-7">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in listDisplay" :key="user.id" class="hover:bg-gray-50">
              <td>
                <v-checkbox-btn v-model="selected" :value="user" color="primary"></v-checkbox-btn>
              </td>
              <template v-for="column in columns" :key="column.value">
                <td v-if="column.value === 'roles'">
                  {{ (user[column.value].map(r => r.name).join(', ')) }}
                </td>
                <td v-else>{{ user[column.value] }}</td>
              </template>
              <td>
                <v-btn variant="text" color="primary"
                  @click="updatingUser = user; dialogCreateUpdate = true">编辑</v-btn>
                <v-btn variant="text" color="error"
                  @click="deletingUser = user; dialogDeleteConfirm = true">删除</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-overlay contained :model-value="loading" class="flex items-center justify-center">
          <v-progress-circular indeterminate color="primary" />
        </v-overlay>
      </div>
    </div>
  </div>

  <create-update-dialog v-model="dialogCreateUpdate" @reload="getList" :key="dialogKey"
    :updating="updatingUser" />
  <delete-confirm-dialog v-model="dialogDeleteConfirm" @reload="getList" :key="dialogKey"
    :deleting="deletingUser ? [deletingUser] : selected" />
  <update-roles-dialog v-model="dialogUpdateRoles" @reload="getList" :key="dialogKey"
    :updating="selected" :action="updateRolesAction" />
</template>