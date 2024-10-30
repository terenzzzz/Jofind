<template>
  <div id="seeker-profile" class="container">
    <div class="row mt-3">
      <div class="card p-5 border-0">
        <!--    公司基本信息-->
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex">
            <div
              class="img-container border border-2 p-2"
              style="height: 80px; width: 80px"
            >
              <img :src="jobs[0].company.logo" class="img-fluid" />
            </div>

            <div class="company d-flex flex-column justify-content-center ms-3">
              <h5 class="fw-bold">{{ jobs[0].company.name }}</h5>
              <p class="text-muted">{{ jobs[0].company.location }}</p>
            </div>
          </div>
          <p class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#companyEditModal">Edit</p>
        </div>
        <div class="row py-2 gx-5 gy-3 mt-3">
          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Founded</p>
            <p class="fw-bold">{{ jobs[0].company.founded }}</p>
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Industry</p>
            <p class="fw-bold">{{ jobs[0].company.industry }}</p>
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Number of employee</p>
            <p class="fw-bold">{{ jobs[0].company.size }}</p>
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Website</p>
            <p class="fw-bold">{{ jobs[0].company.url }}</p>
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Location</p>
            <p class="fw-bold">{{ jobs[0].company.location }}</p>
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Latitude</p>
            <p class="fw-bold">{{ jobs[0].company.latitude }}</p>
          </div>

          <div class="col-3 d-flex flex-column">
            <p class="text-muted">Longitude</p>
            <p class="fw-bold">{{ jobs[0].company.longitude }}</p>
          </div>

          <div class="col-12 d-flex flex-column">
            <p class="text-muted">Company Background</p>
            <p class="fw-bold">{{ jobs[0].company.background }}</p>
          </div>
        </div>
        <el-divider />

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
                  <input class="fw-bold" v-model="jobs[0].company.name">
                </div>

                <div class="col-3 d-flex flex-column">
                  <p class="text-muted">Founded</p>
                  <input v-model="jobs[0].company.founded">
                </div>

                <div class="col-3 d-flex flex-column">
                  <p class="text-muted">Industry</p>
                  <input v-model="jobs[0].company.industry">
                </div>

                <div class="col-3 d-flex flex-column">
                  <p class="text-muted">Number of employee</p>
                  <input v-model="jobs[0].company.size">
                </div>

                <div class="col-3 d-flex flex-column">
                  <p class="text-muted">Website</p>
                  <input v-model="jobs[0].company.url">
                </div>

                <div class="col-3 d-flex flex-column">
                  <p class="text-muted">Location</p>
                  <input v-model="jobs[0].company.location">
                </div>

                <div class="col-3 d-flex flex-column">
                  <p class="text-muted">Latitude</p>
                  <input v-model="jobs[0].company.latitude" type="number">
<!--                  <p class="fw-bold">{{ jobs[0].company.latitude }}</p>-->
                </div>

                <div class="col-3 d-flex flex-column">
                  <p class="text-muted">Longitude</p>
                  <input v-model="jobs[0].company.longitude" type="number">
                </div>

                <div class="col-12 d-flex flex-column">
                  <p class="text-muted">Company Background</p>
                  <textarea v-model="jobs[0].company.background"/>
<!--                  <p class="fw-bold">{{ jobs[0].company.background }}</p>-->
                </div>
              </div>

            </div>
          </div>
        </div>

        <!--        状态信息-->
        <div class="row">
          <div class="col-4">
            <div class="card rounded-3 p-3">
              <h1 class="fw-bold">10</h1>
              <p>Application need to be managed</p>
            </div>
          </div>

          <div class="col-4">
            <div class="card rounded-3 p-3">
              <h1 class="fw-bold">10</h1>
              <p>Message unread</p>
            </div>
          </div>

          <div class="col-4">
            <div class="card rounded-3 p-3">
              <h1 class="fw-bold">10</h1>
              <p>Job Posted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--    个人简历-->
  <div class="row mt-5"></div>
</template>

<script setup lang="ts">
import { jobs } from '@/mock/jobs'
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1000,
})
source.value = 10

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

