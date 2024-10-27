<template>
  <TopHeader></TopHeader>
  <RouterView />
  <BottomFooter></BottomFooter>
</template>


<script setup lang="ts">
import TopHeader from '@/components/TopHeader.vue'
import BottomFooter from '@/components/BottomFooter.vue'
</script>

