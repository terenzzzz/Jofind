<template>
  <div id="seeker-profile" class="container">

    <div class="row mt-3">
      <div class="card p-5 border-0">
        <!--    公司基本信息-->
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <div class="img-container border border-2 p-2" style="height: 80px; width: 80px">
              <img :src="jobs[0].company.logo" class="img-fluid" />
            </div>

            <div class="company d-flex flex-column justify-content-center ms-3">
              <h5 class="fw-bold">{{ jobs[0].company.name }}</h5>
              <p class="text-muted">{{ jobs[0].company.location }}</p>
            </div>
          </div>
          <p class="text-primary"> Edit </p>

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
        </div>
        <el-divider/>

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
  <div class="row mt-5">

  </div>
</template>

<script setup lang="ts">
import {jobs} from '@/mock/jobs'

</script>

<style scoped lang="css">

</style>
