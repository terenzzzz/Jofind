<template>
  <div class="row my-5">
<!--    左侧导航栏-->
    <div class="col-2">
      <el-menu :default-active="activeIndex" class="h-100">
        <div class="card p-3 rounded-3 border-0">
          <div class="row">
            <div class="col-4">
              <img
                :src="user? 'data:image/png;base64,' + user.avatar: ''"
                class="img-fluid"
              />
            </div>
            <div class="col-8">
              <div class="d-flex flex-column">
                <h3 class="m-0 p-0">{{ user? user.name : '' }}</h3>
                <p>{{ user? user.email:'' }}</p>
                <el-select
                  v-model="selectedStatus"
                  placeholder="Status"
                  size="default"
                >
                  <el-option
                    v-for="item in seekingStatus"
                    :key="item.value"
                    :label="item.status"
                    :value="item._id"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <router-link to="/profile/applyrecord">
          <el-menu-item index="1">
            <i class="bi bi-info-square me-2 fs-5"></i>
            <span class="fs-5">Apply Records</span>
          </el-menu-item>
        </router-link>
        <router-link to="/profile/resume">
          <el-menu-item index="2">
            <i class="bi bi-file-earmark-text me-2 fs-5"></i>
            <span class="fs-5">Resume</span>
          </el-menu-item>
        </router-link>
        <router-link to="/profile/chat" class="d-flex align-items-center w-100">
          <el-menu-item index="3" class="w-100">
              <i class="bi bi-chat-text me-2 fs-5"></i>
              <span class="fs-5 po">Message</span>
              <span class="badge text-bg-danger ms-2">5</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
<!--    右侧内容-->
    <div class="col-10">
      <router-view/>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { getUser } from '@/api/user'
import { getSeekingStatus } from '@/api/seekingStatus'
import { useRoute } from 'vue-router'
const seekingStatus = ref(null)
const selectedStatus = ref(null)
const user = ref(null)


const route = useRoute()

// 定义一个映射关系，将路由路径与菜单的 index 关联起来
const pathToIndexMap = {
  '/profile/applyrecord': '1',
  '/profile/resume': '2',
  '/profile/chat': '3',
}

const activeIndex = computed(() => {
  return pathToIndexMap[route.path] || '1'  // 默认选中 '1'（例如 Home）
})

onMounted(async () => {
  // status.value = await getSeekingStatus()
  await fetchUser()
  await fetchSeekingStatus()
})

async function fetchUser() {
  try {
    const response = await getUser()
    user.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}

async function fetchSeekingStatus() {
  try {
    const response = await getSeekingStatus()
    seekingStatus.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}
</script>
