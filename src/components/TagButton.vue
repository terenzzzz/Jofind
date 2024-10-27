<template >
  <router-link v-if="tag._id" to="/">
    <button class="rounded-3 btn btn-secondary my-1">{{ tag.name }}</button>
  </router-link>
  <button v-else class="rounded-3 btn btn-secondary my-1" disabled>{{ tag.name }}</button>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  tag: {
    _id: number;
    name: string;
  }
}>()

</script>
