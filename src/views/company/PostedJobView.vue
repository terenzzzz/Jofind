

<template>
  <div class="container">
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-primary">Post a new job</button>
    </div>

    <div class="row g-4 d-flex flex-wrap mt-3">
      <div class="col-4 flex-fill" v-for="(job,index) in jobs" :key="index">
        <JobCard  :job="job" class="h-100"></JobCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import JobCard from '@/components/JobCard.vue'
import { jobs } from '@/mock/jobs'
</script>

<style scoped lang="css">


</style>
