<template>
  <div class="row my-5">
<!--    左侧导航栏-->
    <div class="col-2">
      <el-menu default-active="1" class="h-100">
        <router-link to="/profile">
          <el-menu-item index="1">
            <i class="bi bi-info-square me-2 fs-5"></i>
            <span class="fs-5">Overall</span>
          </el-menu-item>
        </router-link>
        <router-link to="/profile/resume">
          <el-menu-item index="2">
            <i class="bi bi-file-earmark-text me-2 fs-5"></i>
            <span class="fs-5">Resume</span>
          </el-menu-item>
        </router-link>
        <router-link to="/profile/message" class="d-flex align-items-center w-100">
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

</script>
