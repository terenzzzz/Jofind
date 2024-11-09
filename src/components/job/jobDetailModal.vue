<template>
  <button
    id="showBtn"
    type="button"
    class="btn btn-primary invisible"
    data-bs-toggle="modal"
    :data-bs-target="'#'+job._id"
  >
    Launch demo modal
  </button>

  <div class="modal fade" :id="job._id" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content card p-5 overflow-auto">
        <div class="d-flex justify-content-between">
          <p class="btn" @click="closeModalById()">
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
                  <div
                    class="btn btn-primary"
                    v-if="!isApplied"
                    @click="handleApply"
                  >
                    Apply Now
                  </div>
                  <div class="btn btn-success" v-if="isApplied" disabled="">
                    Applied
                  </div>
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
              <img
                :src="job ? 'data:image/png;base64,' + job.company.logo : ''"
                class="img-fluid"
              />
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
              <div :id="'map' + job._id" style="height: 200px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addApplication, getApplicationByJob } from '@/api/application'


import { convertISOToDate } from '@/utils/timeConverter'
import { Job } from '@/types/Job'
import { nextTick, onMounted, ref, defineEmits } from 'vue'
import L from 'leaflet'
import { ElNotification } from 'element-plus'

const props = defineProps<{ job: Job, showAction: boolean }>()

const isShowMap = ref(false)
const isApplied = ref(false)

const emit = defineEmits({ closeModal: null })

onMounted(async () => {
  await fetchApplyStatus()
  const btn = document.getElementById('showBtn')
  btn.click()
})

async function fetchApplyStatus() {
  try {
    const response = await getApplicationByJob(props.job._id)
    isApplied.value = !!response.data.data
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}

function closeModalById() {
  emit('closeModal');
}

async function handleApply() {
  const formData = new FormData()
  formData.set('job', props.job._id)
  formData.set('company', props.job.company._id)

  try {
    const response = await addApplication(formData);
    if (response.data.status === 200) {
      ElNotification({
        title: 'Success',
        message: 'You Have Successfully Apply the Job!',
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Error',
        message: response.data.message,
        type: 'error',
      })
    }
    await fetchApplyStatus()
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: error.message,
      type: 'error',
    })
  }
}

function toggleMap() {
  isShowMap.value = !isShowMap.value // 切换显示状态
  nextTick(() => {
    if (isShowMap.value) {
      const map = L.map('map' + props.job._id).setView(
        [props.job.latitude.toString(), props.job.longitude.toString()],
        9,
      )
      L.tileLayer(
        'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        {
          attribution: '&copy; 高德地图',
          maxZoom: 10,
          minZoom: 8,
        },
      ).addTo(map)
      L.marker([
        props.job.latitude.toString(),
        props.job.longitude.toString(),
      ]).addTo(map)
    }
  })
}
</script>

<style scoped lang="css"></style>
