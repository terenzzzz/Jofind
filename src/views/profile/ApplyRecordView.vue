<template>
  <div id="overall" class="container">
    <!--    应聘记录-->
    <div class="card mt-4 rounded-3 border-0">
      <div v-for="(job, index) in jobs" :key="index">
        <ApplyRecordCard :job="job" :step="1"></ApplyRecordCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue'
import ApplyRecordCard from '@/components/profile/ApplyRecordCard.vue'
import { jobs } from '@/mock/jobs'
import { getSeekingStatus } from '@/api/seekingStatus'
import { getUser } from '@/api/user'


</script>

<style scoped lang="css"></style>
