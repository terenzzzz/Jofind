<template>
  <div class="card rounded-3 p-3 shadow">

<!--    公司信息-->
    <div class="d-flex flex-row justify-content-between align-items-center">
      <div class="img-container border border-2 p-2" style="height: 80px; width: 80px">
        <img src="@/assets/apple.jpg" class="img-fluid" />
      </div>

      <div class="company d-flex flex-column justify-content-center">
        <h5 class="fw-bold">Apple</h5>
        <p class="text-muted">广州, 中国</p>
      </div>

      <button class="btn btn-light"><i class="bi bi-bookmark-star fs-5 text-warning"></i></button>
    </div>

<!--    标签列表-->
    <div class="row d-flex flex-row g-1" >
      <div class="col-auto"  v-for="tag in tags" :key="tag._id">
        <TagButton :tag="tag"></TagButton>
      </div>
    </div>

<!--    岗位-->
    <h5 class="fw-bold mt-5">Design UI/UX</h5>

<!--    岗位描述-->
    <p class="text-muted mb-5"> Can analyze the needs of clients who have a high sense of design.</p>

<!--    薪水-->
    <div class="d-flex justify-content-between align-items-baseline">
      <p class="m-0"><strong class="fs-4 text-primary">$1320</strong>/Month</p>

      <button class="btn btn-outline-primary btn-sm">Apply Now</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import TagButton from '@/components/TagButton.vue'
import { reactive } from 'vue'

const tags = reactive([
  {
    _id: 1,
    name: "Full-Time"
  },
  {
    _id: 2,
    name: "Onsite"
  },
]);


</script>

<style scoped lang="css">

</style>
