

<template>
  <div class="container">
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#postJobModal">Post a new job</button>


    <!--        编辑模态框-->
    <div class="modal fade" id="postJobModal" tabindex="-1" >
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content card p-4">
            <div class="d-flex justify-content-between">
              <p class="btn"  data-bs-toggle="modal" data-bs-target="#companyEditModal"><i class="bi bi-x-lg"></i></p>
              <p class="btn btn-primary" >Save</p>
            </div>
            <h5 class="text-center mt-5"> Job Position Information </h5>
            <div class="row py-2 gx-5 gy-3 mt-3">

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Department</p>
                <input v-model="jobs[0].department" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Job Title(role)</p>
                <input v-model="jobs[0].role" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Experience Needed</p>
                <input v-model="jobs[0].experience" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Education Needed</p>
                <input v-model="jobs[0].education" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Working Location</p>
                <input v-model="jobs[0].location" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Working Location Latitude</p>
                <input v-model="jobs[0].latitude" type="number" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Working Location Longitude</p>
                <input v-model="jobs[0].longitude" type="number" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Salary From (K/Month)</p>
                <input v-model="jobs[0].salaryFrom" type="number" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Salary To (K/Month)</p>
                <input v-model="jobs[0].salaryTo" type="number" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Start Receiving Resume From</p>
                <input v-model="jobs[0].startDate" type="date" class="form-control" >
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Stop Receiving Resume From</p>
                <input v-model="jobs[0].endDate" type="date" class="form-control" >
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Briefly describe the job </p>
                <textarea v-model="jobs[0].conclusion" class="form-control" style="min-height: 150px"/>
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Full Description</p>
                <textarea v-model="jobs[0].description" class="form-control" style="min-height: 150px"/>
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Requirements</p>
                <textarea v-model="jobs[0].requirements" class="form-control" style="min-height: 150px" />
              </div>



            </div>

<!--            公司基本信息-->
            <h5 class="text-center mt-5"> Company Information</h5>
            <CompanyCard :job="jobs[0]"/>
            <el-divider/>

          </div>
        </div>
      </div>
    </div>


    <div class="row g-4 d-flex flex-wrap mt-3">
      <div class="col-4 flex-fill" v-for="(job,index) in jobs" :key="index">
        <JobCard  :job="job" :can-edit="false" class="h-100"></JobCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import JobCard from '@/components/JobCard.vue'
import { jobs } from '@/mock/jobs'
import CompanyCard from '@/components/company/CompanyCard.vue'
</script>

<style scoped lang="css">


</style>
