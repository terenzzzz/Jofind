<template>
  <div class="card rounded-3 p-4 my-2">
    <div class="d-flex justify-content-between">


      <div class="d-flex">
        <img :src="job.company.logo" class="img-fluid" style="width: 50px; height: 50px;" />
        <div class="d-flex flex-column ms-3">
          <h5> {{ job.position }} </h5>
          <p class="text-muted">{{ job.company.name }} ({{ job.company.location }})</p>
        </div>
      </div>
      <p class="text-primary fs-5"> 8-10K</p>
    </div>

    <el-steps  :active="step" align-center class="mt-4">
      <el-step title="Step 1" description="Resume Submitted" />
      <el-step title="Step 2" description="Evaluation Passed" />
      <el-step title="Step 3" description="Offer Sent" />
      <el-step title="Step 4" description="Contract Signed" />
    </el-steps>
  </div>

</template>

<script setup lang="ts">
import {Job} from '@/types/Job'


interface Step {
  step: number
}

// 使用 defineProps 来接收 job prop
defineProps<{ job: Job, step: Step }>()



</script>

<style scoped lang="css">

</style>
