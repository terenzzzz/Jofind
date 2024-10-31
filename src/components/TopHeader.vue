<template>
  <nav id="navbar" class="navbar navbar-expand-lg py-2  m-0 sticky-top">
    <div class="container-fluid">
      <router-link
        class="navbar-brand fs-3 fw-bold primary text-decoration-none d-flex align-items-center"
        to="/"
      >
        <img src="@/assets/logo.png" class="img-fluid" style="width: 150px">
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-row-reverse" id="collapsibleNavbar">
        <ul class="navbar-nav d-flex align-items-center">

          <li class="nav-item" v-if="isLoggedIn && userRole === accountType.JobSeeker">
            <router-link to="/job" class="item fw-bold text-primary">
              Jobs
            </router-link>
          </li>

          <li class="nav-item" v-if="isLoggedIn && userRole === accountType.JobSeeker">
            <router-link to="/profile" class="item text-decoration-none text-primary">
              <img src="https://ui-avatars.com/api/?name=Terence'" class="img-fluid rounded-circle" style="max-width: 50px">
            </router-link>
          </li>

          <li class="nav-item" v-if="isLoggedIn">
            <p @click.prevent="logout">Logout</p>
          </li>



          <li class="nav-item" v-if="!isLoggedIn">
            <router-link to="/login" class="item text-decoration-none text-primary">
              Login
            </router-link>
          </li>

          <li class="nav-item" v-if="!isLoggedIn">
            <router-link to="/signup" class="item text-decoration-none btn btn-primary text-white">
              Get Started
            </router-link>
          </li>



<!--          <li class="nav-item">-->
<!--            <a href="javascript:void(0);" class="item">-->
<!--              <img src="@/assets/country/cn.png" alt="Language Flag" style="width: 32px"/>-->
<!--            </a>-->
<!--          </li>-->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { accountType } from '@/enums/accountType'
import {useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute();
const isLoggedIn = ref(false)
const userRole = ref(-1)

onMounted(()=>{
  checkAuth()
})

// 使用 watch 来监听路由路径的变化
watch(
  () => route.path,
  (newPath, oldPath) => {
    // 当路由路径变化时调用 checkAuth 方法
    checkAuth();
  },
  { immediate: true } // 设置 immediate 为 true 以在组件挂载时立即执行一次
);

function checkAuth() {
  const token = localStorage.getItem('access_token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && token) {
    userRole.value = parseInt(user.role)
    isLoggedIn.value = true
  }
}

function logout() {
  localStorage.clear();
  isLoggedIn.value = false;
  router.push({path: '/'}); // Redirect to home page after logout
}

</script>

<style lang="css" scoped>
#navbar{
  background-color: rgba(247, 247, 248, 0.7);
}

.item {
  color: black;
  font-size: 20px;
  margin-inline: 14px;
}

.navbar-nav .nav-item {
  padding: 10px;
}


</style>
