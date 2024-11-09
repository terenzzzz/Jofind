

<template>
  <div class="modal fade" :id="job._id" tabindex="-1" v-if="isViewOnly">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content card p-5 overflow-auto">
        <div class="d-flex justify-content-between">
          <p
            class="btn"
            @click="closeModalById(job._id)"
          >
            <i class="bi bi-x-lg"></i>
          </p>
        </div>
        <div class="row">
          <!--            岗位信息-->
          <div class="col-8">
            <div class="card p-2 border-1 border-light">
              <!--          头部信息-->
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h3>{{ job.role }}</h3>
                  <a class="text-primary">{{ job.company.website }}</a>
                </div>
                <div class="ms-5" v-if="showAction">
                  <div class="btn btn-light" v-if="!isApplied">Report Job</div>
                  <div class="btn btn-primary" v-if="!isApplied" @click="handleApply">Apply Now</div>
                  <div class="btn btn-success" v-if="isApplied" disabled="">Applied</div>
                </div>
              </div>
              <el-divider />

              <!--              职位基本要求-->
              <div class="row py-2 gy-3">
                <div class="col-auto d-flex flex-column">
                  <p class="text-muted">Department</p>
                  <p class="fw-bold">{{ job.department }}</p>
                </div>

                <div class="col-auto d-flex flex-column">
                  <p class="text-muted">Job Role</p>
                  <p class="fw-bold">{{ job.role }}</p>
                </div>

                <div class="col-auto d-flex flex-column">
                  <p class="text-muted">Experience</p>
                  <p class="fw-bold">{{ job.experience }}</p>
                </div>

                <div class="col-auto d-flex flex-column">
                  <p class="text-muted">Education</p>
                  <p class="fw-bold">{{ job.degree }}</p>
                </div>

                <div class="col-auto d-flex flex-column">
                  <p class="text-muted">Location</p>
                  <p class="fw-bold">{{ job.location }}</p>
                </div>

                <div class="col-auto d-flex flex-column">
                  <p class="text-muted">Salary</p>
                  <p class="fw-bold">
                    ${{ job.salaryFrom }} - {{ job.salaryTo }}K
                  </p>
                </div>
              </div>


              <!--              招聘时间-->
              <div
                class="d-flex justify-content-between align-items-center mt-4"
              >
                <p class="text-muted">
                  Advertised since {{ convertISOToDate(job.advFrom) }}
                </p>
                <p class="text-muted">
                  Closed on {{ convertISOToDate(job.advTo) }}
                </p>
              </div>

              <div class="mt-5">
                <h3>Job Description</h3>
                <p>{{ job.description }}</p>
              </div>

              <div class="mt-5">
                <h3>Job Requirements</h3>
                <p>{{ job.description }}</p>
              </div>

              <el-divider />
              <p class="mt-4">
                Please check the requirements above before applying for a
                job<span class="text-danger">*</span>
              </p>
            </div>

          </div>
          <!--            公司信息-->
          <div class="col-4">
            <div class="d-flex justify-content-center">
              <img :src="job? 'data:image/png;base64,' + job.company.logo: ''" class="img-fluid" />
            </div>
            <el-divider />

            <div class="d-flex flex-column my-2">
              <p class="text-muted">Company</p>
              <p class="fw-bold">{{ job.company.name }}</p>
            </div>

            <div class="d-flex flex-column my-2">
              <p class="text-muted">Industry</p>
              <p class="fw-bold">{{ job.company.industry }}</p>
            </div>

            <div class="d-flex flex-column my-2">
              <p class="text-muted">Founded</p>
              <p class="fw-bold">{{ job.company.founded }}</p>
            </div>

            <div class="d-flex flex-column my-2">
              <p class="text-muted">Company Size</p>
              <p class="fw-bold">{{ job.company.size }} Employees</p>
            </div>

            <div class="d-flex flex-column my-2">
              <p class="text-muted">Location</p>
              <div class="d-flex justify-content-between align-items-center">
                <p class="fw-bold">{{ job.company.location }}</p>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="toggleMap"
                >
                  {{ isShowMap ? 'Close Map' : 'Show Map' }}
                </button>
              </div>
            </div>

            <el-divider />

            <div class="card overflow-hidden" v-if="isShowMap">
              <div :id="'map'+job._id" style="height: 200px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { convertISOToDate } from '@/utils/timeConverter'
import { Job } from '@/types/Job'

const props = defineProps<{ job: Job }>()

</script>

<style scoped lang="css">

</style>
