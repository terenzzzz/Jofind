<template>
  <div class="row my-5" style="min-height: 80vh">
    <!--    左侧导航栏-->
    <div class="col-2">
      <el-menu :default-active="activeIndex" class="h-100">
        <!--    基本个人信息-->
        <div class="card p-3 rounded-3 border-0">
          <div class="row">
            <div class="col-4">
              <img
                :src="user? 'data:image/png;base64,' + user.avatar: ''"
                class="img-fluid"
              />
            </div>
            <div class="col-8 p-3">
              <div class="d-flex flex-column">
                <h3>{{ user? user.name : '' }}</h3>
                <p>{{ user? user.email:'' }}</p>
              </div>
            </div>
          </div>
        </div>
        <router-link to="/dashboard/company">
          <el-menu-item index="1">
            <i class="bi bi-info-square me-2 fs-5"></i>
            <span class="fs-5">My Company</span>
          </el-menu-item>
        </router-link>
        <router-link to="/dashboard/postedjob">
          <el-menu-item index="2">
            <i class="bi bi-file-earmark-text me-2 fs-5"></i>
            <span class="fs-5">Posted Jobs</span>
          </el-menu-item>
        </router-link>
        <router-link to="/dashboard/application">
          <el-menu-item index="3">
            <i class="bi bi-file-earmark-text me-2 fs-5"></i>
            <span class="fs-5">Application</span>
          </el-menu-item>
        </router-link>
        <router-link to="/dashboard/message" class="d-flex align-items-center w-100">
          <el-menu-item index="4" class="w-100">
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
import { onMounted, ref, computed  } from 'vue'
import { getUser } from '@/api/user'
import { useRoute } from 'vue-router'

const route = useRoute()

// 定义一个映射关系，将路由路径与菜单的 index 关联起来
const pathToIndexMap = {
  '/dashboard/dashboard': '1',
  '/dashboard/postedjob': '2',
  '/dashboard/application': '3',
  '/dashboard/message': '4'
}

const activeIndex = computed(() => {
  return pathToIndexMap[route.path] || '1'  // 默认选中 '1'（例如 Home）
})

const user = ref(null)

// const companyStore = useCompanyStore()

onMounted(async () => {
  // status.value = await getSeekingStatus()
  await fetchUser()
})

async function fetchUser() {
  try {
    const response = await getUser()
    user.value = response.data.data
    // companyStore.$patch(user.value.company)
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}



</script>
