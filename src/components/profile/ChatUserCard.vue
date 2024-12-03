<template>
  <div class="card py-2 border-0 " :class="isSelected? 'bg-primary text-white rounded-3': 'bg-white text-black rounded-0'"  @click="selectChat">
    <div class="d-flex ps-2 overflow-y-auto">
      <img :src="'data:image/png;base64,' + chat.company.logo" class="img-fluid border border-2" style="max-width: 50px; height: 50px"/>
      <div class="d-flex flex-column ms-2 overflow-y-auto">
        <strong class="m-0 p-0">{{chat.company.name}}</strong>
        <p class="small truncated-text w-100" :class="isSelected? 'text-white': 'text-muted'">Message Placeholder</p>
      </div>
    </div>
  </div>
  <el-divider class="my-1"/>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
const emit = defineEmits();



const props = defineProps<{chat: object,  isSelected: boolean}>()

function selectChat() {
  // 使用 $emit 向父组件传递选中的 chat
  emit('select-chat', props.chat);
}

</script>

<style lang="css" scoped>
.truncated-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
