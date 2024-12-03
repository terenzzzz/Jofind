<template>

  <div class="d-flex align-items-center my-3" :class="message.sender._id === currentUser? 'justify-content-end': 'justify-content-start'">
    <img
      :src="message.sender.avatar? 'data:image/png;base64,' + message.sender.avatar : 'data:image/png;base64,' + message.sender.logo "
      class="img-fluid rounded-circle border border-1"
      style="width: 30px; height: 30px"
      :class="message.sender._id === currentUser? 'order-1': 'order-0'"
    />

    <div class="card border-light bg-light mx-3 p-2 px-4 d-flex" :class="message.sender._id === currentUser? 'order-0': 'order-1'">
      <p>{{ message.message }}</p>
      <span class="text-muted small text-end" style="font-size: 12px">{{ convertISOToDateTime(message.createdAt) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertISOToDateTime } from '@/utils/timeConverter'
import { defineProps, onMounted, ref } from 'vue'

const props = defineProps<{message: object}>()

const currentUser = ref('')

onMounted(()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  currentUser.value = user._id
})

</script>

<style scoped lang="css"></style>
