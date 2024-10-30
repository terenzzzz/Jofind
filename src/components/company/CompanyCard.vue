

<template>
  <div class="card p-4">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <div
          class="img-container border border-2 p-2"
          style="height: 80px; width: 80px"
        >
          <img :src="job.company.logo" class="img-fluid" />
        </div>
        <div class="company d-flex flex-column justify-content-center ms-3">
          <h5 class="fw-bold">{{ job.company.name }}</h5>
          <p class="text-muted">{{ job.company.location }}</p>
        </div>
      </div>
      <p class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#companyEditModal" v-if="canEdit">Edit</p>
    </div>
    <div class="row py-2 gx-5 gy-3 mt-3">
      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Founded</p>
        <p class="fw-bold">{{ job.company.founded }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Industry</p>
        <p class="fw-bold">{{ job.company.industry }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Number of employee</p>
        <p class="fw-bold">{{ job.company.size }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Website</p>
        <p class="fw-bold">{{ job.company.url }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Location</p>
        <p class="fw-bold">{{ job.company.location }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Latitude</p>
        <p class="fw-bold">{{ job.company.latitude }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Longitude</p>
        <p class="fw-bold">{{ job.company.longitude }}</p>
      </div>

      <div class="col-12 d-flex flex-column">
        <p class="text-muted">Company Background</p>
        <p class="fw-bold">{{ job.company.background }}</p>
      </div>
    </div>
  </div>

  <!--        编辑模态框-->
  <div class="modal fade" id="companyEditModal" tabindex="-1" >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content card p-4">
        <div class="d-flex justify-content-between">
          <p class="btn"  data-bs-toggle="modal" data-bs-target="#companyEditModal"><i class="bi bi-x-lg"></i></p>
          <p class="btn btn-primary" >Save</p>
        </div>

        <div class="d-flex mt-5 align-items-center">
          <div class="img-container border border-2 p-2" style="height: 100px; width: 100px">
            <img :src="companyLogo" class="img-fluid" />
          </div>
          <div class="mb-3 ms-3">
            <label for="formFileSm" class="form-label">Upload Company Logo</label>
            <input class="form-control form-control-sm" id="formFileSm" type="file" @change="onFileChange">
          </div>
        </div>



        <div class="row py-2 gx-5 gy-3 mt-3">
          <div class=" col-12 d-flex flex-column">
            <p class="text-muted">Company Name</p>
            <input class="fw-bold form-control" v-model="jobs[0].company.name" >
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Founded</p>
            <input v-model="jobs[0].company.founded" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Industry</p>
            <input v-model="jobs[0].company.industry" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Number of employee</p>
            <input v-model="jobs[0].company.size" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Website</p>
            <input v-model="jobs[0].company.url" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Location</p>
            <input v-model="jobs[0].company.location" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Latitude</p>
            <input v-model="jobs[0].company.latitude" type="number" class="form-control">
            <!--                  <p class="fw-bold">{{ jobs[0].company.latitude }}</p>-->
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Longitude</p>
            <input v-model="jobs[0].company.longitude" type="number" class="form-control">
          </div>

          <div class="col-12 d-flex flex-column">
            <p class="text-muted">Company Background</p>
            <textarea v-model="jobs[0].company.background" style="min-height: 150px" class="form-control"/>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Job } from '@/types/Job'
import { jobs } from '@/mock/jobs'
import { ref } from 'vue'

defineProps<{job : Job, canEdit: boolean}>()

const companyLogo = ref(jobs[0].company.logo)

function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    // 创建一个URL指向这个文件对象
    companyLogo.value = URL.createObjectURL(file);
  } else {
    companyLogo.value = null;
  }
}
</script>

<style scoped lang="css">

</style>
