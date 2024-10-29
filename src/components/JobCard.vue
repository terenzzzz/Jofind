<template>
  <div class="card rounded-3 p-3 shadow h-100">
    <!--    公司信息-->
    <div class="d-flex flex-row justify-content-between align-items-center">
      <div class="img-container border border-2 p-2" style="height: 80px; width: 80px">
        <img :src="job.company.logo" class="img-fluid" />
      </div>

      <div class="company d-flex flex-column justify-content-center">
        <h5 class="fw-bold">{{ job.company.name }}</h5>
        <p class="text-muted">{{ job.company.location }}</p>
      </div>
    </div>

    <!--    岗位-->
    <h5 class="fw-bold mt-5">{{ job.role }}</h5>

    <!--    岗位描述-->
    <p class="text-muted mb-5">
      {{ job.conclusion }}
    </p>

    <!--    薪水-->
    <div class="d-flex justify-content-between align-items-baseline">
      <p class="m-0">
        <strong class="fs-4 text-primary"
          >${{ job.salaryFrom }} - {{ job.salaryTo }}K </strong
        >/Month
      </p>

      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-outline-primary btn-sm"
        data-bs-toggle="modal"
        :data-bs-target="'#'+job.id"
      >
        View
      </button>
    </div>

    <div class="modal fade" :id="job.id" tabindex="-1" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content card p-5 overflow-auto">
          <div class="row">
            <!--            岗位信息-->
            <div class="col-8">
              <div class="card p-2 border-1 border-light">
                <!--          头部信息-->
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3>{{ job.role }}</h3>
                    <a class="text-primary">{{ job.company.url }}</a>
                  </div>
                  <div class="ms-5">
                    <div class="btn btn-light">Report Job</div>
                    <div class="btn btn-primary">Apply Now</div>
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
                    <p class="fw-bold">{{ job.education }}</p>
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

                <!--    标签列表-->
                <div class="row d-flex flex-row g-1 mt-3">
                  <div class="col-auto" v-for="tag in job.tags" :key="tag._id">
                    <button
                      class="rounded-3 btn btn-secondary btn-sm my-1"
                      disabled
                    >
                      {{ tag.name }}
                    </button>
                  </div>
                </div>

                <!--              招聘时间-->
                <div
                  class="d-flex justify-content-between align-items-center mt-4"
                >
                  <p class="text-muted">
                    Advertised since {{ convertISOToDate(job.startDate) }}
                  </p>
                  <p class="text-muted">
                    Closed on {{ convertISOToDate(job.endDate) }}
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

              <!--              <div class="card border-light p-3 mt-3">-->
              <!--                <div class="d-flex justify-content-between align-items-center">-->
              <!--                  <h5>Sugestion Jobs</h5>-->
              <!--                  <p class="text-primary">See All</p>-->

              <!--                </div>-->
              <!--              </div>-->
            </div>
            <!--            公司信息-->
            <div class="col-4">
              <div class="d-flex justify-content-center">
                <img :src="job.company.logo" class="img-fluid" />
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
                <div :id="'map'+job.id" style="height: 200px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Job } from '@/types/Job'
import { convertISOToDate } from '@/utils/timeConverter'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ref, nextTick } from 'vue'

const isShowMap = ref(false)


function toggleMap() {
  isShowMap.value = !isShowMap.value // 切换显示状态
  nextTick(() => {
    if (isShowMap.value) {
      console.log(props.job.id)
      const map = L.map('map'+props.job.id).setView([props.job.latitude.toString(), props.job.longitude.toString()], 9)
      L.tileLayer(
        'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        {
          attribution: '&copy; 高德地图',
          maxZoom: 10,
          minZoom: 8,
        },
      ).addTo(map)
      L.marker([props.job.latitude.toString(), props.job.longitude.toString()]).addTo(map)
    }
  })
}

// 使用 defineProps 来接收 job prop
const props = defineProps<{ job: Job }>()



</script>

<style scoped lang="css"></style>
