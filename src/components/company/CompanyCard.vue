

<template>
  <div class="card p-4" v-if="updatedCompany">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <div
          class="img-container border border-2 p-2"
          style="height: 80px; width: 80px"
        >
          <img :src="updatedCompany.logo? 'data:image/png;base64,' + updatedCompany.logo: ''" class="img-fluid" />
        </div>
        <div class="company d-flex flex-column justify-content-center ms-3">
          <h5 class="fw-bold">{{ updatedCompany.name }}</h5>
          <p class="text-muted">{{ updatedCompany.location }}</p>
        </div>
      </div >
      <p class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#companyEditModal" v-if="canEdit">Edit</p>
    </div>
    <div class="row py-2 gx-5 gy-3 mt-3">
      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Founded</p>
        <p class="fw-bold">{{ updatedCompany.founded }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Industry</p>
        <p class="fw-bold">{{ updatedCompany.industry }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Number of employee</p>
        <p class="fw-bold">{{ updatedCompany.size }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Website</p>
        <p class="fw-bold">{{ updatedCompany.website }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Location</p>
        <p class="fw-bold">{{ updatedCompany.location }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Latitude</p>
        <p class="fw-bold">{{ updatedCompany.latitude }}</p>
      </div>

      <div class="col-3 d-flex flex-column">
        <p class="text-muted">Longitude</p>
        <p class="fw-bold">{{ updatedCompany.longitude }}</p>
      </div>

      <div class="col-12 d-flex flex-column">
        <p class="text-muted">Company Background</p>
        <p class="fw-bold">{{ updatedCompany.background }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <el-empty description="You are not setting your company yet">
<!--      <el-button type="primary" >Add a Company</el-button>-->
      <el-button class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#companyEditModal" v-if="canEdit">Edit</el-button>
    </el-empty>
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
            <img :src="newLogo? newLogo: 'data:image/png;base64,' + updatedCompany.logo" class="img-fluid" />
          </div>
          <div class="mb-3 ms-3">
            <label for="formFileSm" class="form-label">Upload Company Logo</label>
            <input class="form-control form-control-sm" id="formFileSm" type="file" @change="onFileChange">
          </div>
        </div>



        <div class="row py-2 gx-5 gy-3 mt-3">
          <div class=" col-12 d-flex flex-column">
            <p class="text-muted">Company Name</p>
            <input class="fw-bold form-control" v-model="updatedCompany.name" >
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Founded</p>
            <input v-model="updatedCompany.founded" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Industry</p>
            <input v-model="updatedCompany.industry" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Number of employee</p>
            <input v-model="updatedCompany.size" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Website</p>
            <input v-model="updatedCompany.website" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Location</p>
            <input v-model="updatedCompany.location" class="form-control">
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Latitude</p>
            <input v-model="updatedCompany.latitude" type="number" class="form-control">
            <!--                  <p class="fw-bold">{{ jobs[0].company.latitude }}</p>-->
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Longitude</p>
            <input v-model="updatedCompany.longitude" type="number" class="form-control">
          </div>

          <div class="col-12 d-flex flex-column">
            <p class="text-muted">Company Background</p>
            <textarea v-model="updatedCompany.background" style="min-height: 150px" class="form-control"/>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Company } from '@/types/Job'
import { reactive, ref } from 'vue'

const props = defineProps<{company : Company, canEdit: boolean}>()

const updatedCompany = reactive(props.company)
const newLogo = ref(updatedCompany.logo)

function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    // 创建一个URL指向这个文件对象
    newLogo.value = URL.createObjectURL(file);
  } else {
    newLogo.value = null;
  }
}
</script>

<style scoped lang="css">

</style>
