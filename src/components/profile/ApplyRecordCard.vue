<template>
  <div class="card rounded-3 p-4 my-2">
    <div class="d-flex justify-content-between">


      <div class="d-flex">
        <img :src="'data:image/png;base64,' +application.job.company.logo" class="img-fluid" style="width: 50px; height: 50px;" />
        <div class="d-flex flex-column ms-3" @click="toggleDetailModal">
          <h5> {{ application.job.role }} </h5>
          <p class="text-muted">{{ application.job.company.name }} ({{ application.job.company.location }})</p>
        </div>
      </div>
      <p class="text-primary fs-5"> {{application.job.salaryFrom}} - {{application.job.salaryTo}}K</p>
    </div>

    <el-steps  :active="application.step" finish-status="success" process-status="finish" align-center class="mt-4">
      <el-step title="Step 1" description="Resume Submitted" />
      <el-step title="Step 2" description="Evaluation Passed" />
      <el-step title="Step 3" description="Offer Sent" />
      <el-step title="Step 4" description="Contract Signed" />
    </el-steps>
  </div>
  <job-detail-modal :job="application.job" v-if="showDetailModal" :showAction="true" @closeModal="toggleDetailModal"></job-detail-modal>
</template>

<script setup lang="ts">
import type { Application } from '@/types/Application'
import JobDetailModal from '@/components/job/jobDetailModal.vue'
import { ref } from 'vue'

// 使用 defineProps 来接收 job prop
const props = defineProps<{ application: Application }>()


const showDetailModal = ref(false);

function toggleDetailModal(){
  showDetailModal.value = !showDetailModal.value;
  // 移除类型modal-backdrop的dom元素
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => backdrop.remove());
}




</script>

<style scoped lang="css">

</style>
