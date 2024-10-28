<template>
  <div id="messageView" class="container">
    <div class="row rounded-2 g-2">
      <div class="col-12 col-md-4 col-lg-3 d-flex flex-column justify-content-center">
        <div class="card p-2 overflow-auto" style="height: 60vh">
          <h5 class="text-center fw-bold">Message</h5>
          <el-divider class="my-2"/>
          <div v-for="(user,index) in chatUser" :key="index" >
            <ChatUserCard :chatUser="user"></ChatUserCard>
          </div>


        </div>
      </div>
      <div class="col-12 col-md-8 col-lg-9 d-flex flex-column justify-content-center">
        <div class="card rounded-2 bg-white p-3 " style="height: 60vh">
<!--          当前对话框对象-->
          <div class="d-flex ps-2 align-items-center justify-content-between">
            <div>
              <img :src="chatUser[0].logo" class="img-fluid border border-2 rounded-circle" style="max-width: 50px; height: 50px"/>
              <strong class="ms-3">{{chatUser[0].name}}</strong>
            </div>
            <i class="bi bi-info-circle fs-3"></i>
          </div>
          <el-divider class="my-2"/>
<!--          对话内容-->
          <div class="h-100 overflow-auto px-3">
            <div v-for="(msg,index) in chatMessages" :key="index">
              <ChatBubble :chatMessage="msg"></ChatBubble>
            </div>
          </div>
<!--          输入框-->
          <div class="card" style="height: 5vh">
            <div class="row m-0 p-0 h-100 w-100 g-0">
              <div class="col-10 "><input class="w-100 h-100 rounded-0 border-0"/></div>
              <div class="col-2"><button class="btn btn-primary w-100 h-100 rounded-0"><i class="bi bi-send"></i></button></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { chatUser } from '@/mock/chatUser'
import { chatMessages } from '@/mock/chatMessages'
import ChatUserCard from '@/components/profile/ChatUserCard.vue'
import ChatBubble from '@/components/profile/ChatBubble.vue'


</script>

<style scoped lang="css">

</style>
