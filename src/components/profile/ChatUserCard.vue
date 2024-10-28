<template>
  <div class="card py-2 rounded-0 border-0 bg-white">
    <div class="d-flex ps-2">
      <img :src="chatUser.logo" class="img-fluid border border-2" style="max-width: 50px; height: 50px"/>
      <div class="d-flex flex-column ms-2">
        <strong class="m-0 p-0">{{chatUser.name}}</strong>
        <p class="text-muted">{{chatUser.message}}</p>
      </div>
    </div>
    <el-divider class="my-1"/>
  </div>
</template>

<script setup lang="ts">
interface ChatUser {
  logo: string,
  name: string,
  message: string,
}

defineProps<{chatUser: ChatUser}>()

</script>

