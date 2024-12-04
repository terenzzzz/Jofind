<template>
  <div id="messageView" class="container">
    <div class="row rounded-2 g-2">
      <div class="col-12 col-md-4 col-lg-3 d-flex flex-column justify-content-center">
        <div class="card p-2 overflow-auto" style="height: 70vh">
          <h5 class="text-center fw-bold">Message</h5>
          <el-divider class="my-2"/>
          <div v-for="(chat,index) in chatList" :key="index" >
            <ChatUserCard :chat="chat" :isSelected="selectedRoom._id === chat._id" @select-chat="handleSelectChat" ></ChatUserCard>
          </div>


        </div>
      </div>
      <div class="col-12 col-md-8 col-lg-9 d-flex flex-column justify-content-center">
        <div class="card rounded-2 bg-white p-3 " style="height: 70vh">


          <!--          当前对话框对象-->
          <div class="d-flex ps-2 align-items-center justify-content-between">
            <div>
              <img :src="'data:image/png;base64,' + selectedRoom?.seeker.avatar" class="img-fluid border border-2 rounded-circle" style="max-width: 50px; height: 50px"/>
              <strong class="ms-3">{{selectedRoom?.seeker.name}}</strong>
            </div>
            <i class="bi bi-info-circle fs-3"></i>
          </div>
          <el-divider class="my-2"/>


          <!--          对话内容-->
          <div class="h-100 overflow-auto px-3" ref="chatBox">
            <div v-for="(msg,index) in msgList" :key="index">
              <ChatBubble :message="msg"></ChatBubble>
            </div>
          </div>


          <!--          输入框-->
          <div class="card" style="height: 5vh">
            <div class="row m-0 p-0 h-100 w-100 g-0">
              <div class="col-10">
                <input
                  class="w-100 h-100 rounded-0 border-0"
                  v-model="inputMsg"
                  @keydown.enter="sendMsg"
                />
              </div>
              <div class="col-2">
                <button
                  class="btn btn-primary w-100 h-100 rounded-0"
                  @click="sendMsg"
                >
                <i class="bi bi-send"></i>
                </button>
              </div>
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
import { onMounted, ref } from 'vue'
import { getSocket } from '@/utils/socket';
import { useRoute, useRouter } from 'vue-router'
import { getJobs } from '@/api/job'
import { getChatRoomByCompany, getChatRoomBySeeker, getMsgByChatRoom } from '@/api/chat'
const router = useRouter()
const route = useRoute()



onMounted(async () => {
  // 获取 URL 中的查询参数 room
  // room.value = route.query.room;
  // if (room.value) {
  //   joinChatRoom(room.value);
  // } else {
  //   console.error('No room ID provided!');
  // }

  await fetchChat()
})



async function fetchChat(){
  try {
    const response = await getChatRoomByCompany()
    chatList.value = response.data.data
    selectedRoom.value = response.data.data[0];
    await fetchMsgByChatRoom(response.data.data[0]._id)
    joinChatRoom(response.data.data[0]._id)
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}

const chatList = ref([])
const selectedRoom = ref(null);
const msgList = ref([])
const inputMsg = ref('')
const chatBox = ref(null); // 引用聊天框

async function handleSelectChat(chatRoom: object){
  selectedRoom.value = chatRoom;
  joinChatRoom(chatRoom._id)
  await fetchMsgByChatRoom(chatRoom._id)
}

async function fetchMsgByChatRoom(chatRoom){
  try {
    const response = await getMsgByChatRoom(chatRoom)
    msgList.value = response.data.data
    // 让滚动条滚动到最下面
    if (chatBox.value) {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}


function joinChatRoom(room) {
  const socket = getSocket();
  socket.emit('create or join', room);

  // 监听房间创建或加入成功的事件
  socket.on('joined', (room) => {
    console.log(`User are now in room ${room}`);
  });

  // 监听错误事件（如果有的话）
  socket.on('error', (error) => {
    console.error('Error:', error.message);
  });
}

function sendMsg() {
  const socket = getSocket();
  const user = JSON.parse(localStorage.getItem('user'))
  socket.emit('send msg', selectedRoom.value._id, user._id, inputMsg.value);

  // 监听房间创建或加入成功的事件
  socket.on('msg send', async (room, sender, chatText) => {
    await fetchMsgByChatRoom(room)
    inputMsg.value = ''
    console.log(`${sender} sent message to room ${room}: ${chatText}`);
  });

  // 监听错误事件（如果有的话）
  socket.on('error', (error) => {
    console.error('Error:', error.message);
  });
}

</script>

<style scoped lang="css">
/* 修改垂直滚动条的宽度 */
::-webkit-scrollbar {
  width: 10px; /* 设置滚动条的宽度 */
}

::-webkit-scrollbar-track {
  background: #f1f1f1; /* 设置背景颜色 */
  border-radius: 10px;  /* 设置圆角 */
}

/* 设置滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background-color: #888; /* 设置滑块颜色 */
  border-radius: 10px;     /* 设置圆角 */
  border: 3px solid #f1f1f1; /* 设置边框颜色 */
}

/* 滑块悬停时的样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 滑块悬停时的颜色 */
}
</style>
