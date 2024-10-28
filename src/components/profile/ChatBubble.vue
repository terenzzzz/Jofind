<template>
  <div class="d-flex align-items-center my-3" :class="chatMessage.isMyself? 'justify-content-end': 'justify-content-start'" >
    <img
      :src="chatMessage.logo!=''?chatMessage.logo:'https://ui-avatars.com/api/?name=Terence'"
      class="img-fluid rounded-circle border border-1"
      style="width: 30px; height: 30px"
      :class="chatMessage.isMyself? 'order-1': 'order-0'"
    />
    <div class="card border-light bg-light mx-3 p-2 w-75 d-flex" :class="chatMessage.isMyself? 'order-0': 'order-1'">
      <p>{{ chatMessage.message }}</p>
      <span class="text-muted small text-end" style="font-size: 12px">{{ convertISOToDateTime(chatMessage.time) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertISOToDateTime } from '@/utils/timeConverter'

interface ChatMessage {
  logo: string
  message: string
  time: Date
  isMyself?: boolean
}

withDefaults(defineProps<{ chatMessage: ChatMessage }>(), {
  isMyself: false,
});
</script>

<style scoped lang="css"></style>
