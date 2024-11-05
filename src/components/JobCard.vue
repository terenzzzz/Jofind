<template>
  <div class="card rounded-3 p-3 shadow h-100">
    <!--    公司信息-->
    <div class="d-flex flex-row justify-content-between align-items-center">
      <div class="img-container border border-2 p-2" style="height: 80px; width: 80px">
        <img :src="job? 'data:image/png;base64,' + job.company.logo: ''" class="img-fluid" />
      </div>

      <div class="company d-flex flex-column justify-content-center">
        <h5 class="fw-bold">{{ job.company.name }}</h5>
        <p class="text-muted">{{ job.company.location }}</p>
      </div>
    </div>

    <!--    岗位-->
    <h5 class="fw-bold mt-5">{{ job.role }}</h5>

    <!--    岗位描述-->
    <p class="text-muted mb-5 h-100">
      {{ job.summary }}
    </p>

    <!--    薪水-->
    <div class="d-flex justify-content-between align-items-baseline card-footer bg-white">
      <p class="m-0">
        <strong class="fs-4 text-primary"
          >${{ job.salaryFrom }} - {{ job.salaryTo }}K </strong
        >/Month
      </p>


      <div class="btn-group dropup">
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
          :data-bs-target="'#'+job._id">
          View
        </button>
        <button type="button" class="btn dropdown-toggle dropdown-toggle-split btn-outline-primary" data-bs-toggle="dropdown" aria-expanded="false" v-if="!isViewOnly">
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" v-if="!isViewOnly">
          <!-- Dropdown menu links -->
          <li  style="cursor: pointer"
               data-bs-toggle="modal"
               :data-bs-target="'#editJobModal' + job._id">
            <p class="dropdown-item fw-bold" >Edit</p>
          </li>
          <li  style="cursor: pointer" @click="handleDelete">
            <p class="dropdown-item fw-bold text-danger" >Delete</p>
          </li>
        </ul>
      </div>

    </div>

    <!--  预览-->
    <div class="modal fade" :id="job._id" tabindex="-1">
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
                    <a class="text-primary">{{ job.company.website }}</a>
                  </div>
                  <div class="ms-5" v-if="showAction">
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

    <!--        编辑模态框-->
    <div class="modal fade" :id="'editJobModal' + job._id" tabindex="-1">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <form class="modal-content card p-4" @submit.prevent="handleSubmit">
          <div class="d-flex justify-content-between">
            <p
              class="btn"
              data-bs-toggle="modal"
              data-bs-target="#editJobModal"
            >
              <i class="bi bi-x-lg"></i>
            </p>
            <button class="btn btn-primary" type="submit">Save</button>
          </div>
          <h5 class="text-center mt-5">Job Position Edit</h5>
          <div class="row py-2 gx-5 gy-3 mt-3">
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Website</p>
              <input
                v-model="updatedJob.website"
                type="text"
                class="form-control"
                placeholder="www.jofind.com"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Department</p>
              <input
                v-model="updatedJob.department"
                class="form-control"
                placeholder="Engineering"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Job Title(role)</p>
              <input
                v-model="updatedJob.role"
                class="form-control"
                placeholder="Front End Developer"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Experience Needed(year)</p>
              <input
                v-model="updatedJob.experience"
                type="number"
                class="form-control"
                placeholder="3"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Education Needed</p>
              <input
                v-model="updatedJob.degree"
                class="form-control"
                placeholder="Master"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Working Location</p>
              <input
                v-model="updatedJob.location"
                class="form-control"
                placeholder="Guangzhou, China"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Working Location Latitude</p>
              <input
                v-model="updatedJob.latitude"
                class="form-control"
                placeholder="22.313"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Working Location Longitude</p>
              <input
                v-model="updatedJob.longitude"
                class="form-control"
                placeholder="28.471"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Salary From (K/Month)</p>
              <input
                v-model="updatedJob.salaryFrom"
                type="number"
                class="form-control"
                placeholder="9"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Salary To (K/Month)</p>
              <input
                v-model="updatedJob.salaryTo"
                type="number"
                class="form-control"
                placeholder="15"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Start Receiving Resume From</p>
              <input
                v-model="updatedJob.advFrom"
                type="date"
                class="form-control"
                required
              />
            </div>

            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Stop Receiving Resume From</p>
              <input
                v-model="updatedJob.advTo"
                type="date"
                class="form-control"
                required
              />
            </div>

            <div class="col-12 d-flex flex-column">
              <p class="text-muted">Briefly describe the job</p>
              <textarea
                v-model="updatedJob.summary"
                class="form-control"
                style="min-height: 150px"
                placeholder="A short paragraph describing the duties of the position."
                required
              />
            </div>

            <div class="col-12 d-flex flex-column">
              <p class="text-muted">Full Description</p>
              <textarea
                v-model="updatedJob.description"
                class="form-control"
                style="min-height: 150px"
                placeholder="Describe the job description in detail"
                required
              />
            </div>

            <div class="col-12 d-flex flex-column">
              <p class="text-muted">Requirements</p>
              <textarea
                v-model="updatedJob.requirements"
                class="form-control"
                style="min-height: 150px"
                placeholder="Describe the job requirement in detail"
                required
              />
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Job } from '@/types/Job'
import { convertISOToDate, formatDate } from '@/utils/timeConverter'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ref,reactive, nextTick, watch } from 'vue'
import { updateCompany } from '@/api/company'
import { ElNotification } from 'element-plus'
import { deleteJob, updateJob } from '@/api/job'
import { defineEmits } from 'vue';

const emit = defineEmits();

const isShowMap = ref(false)


function toggleMap() {
  isShowMap.value = !isShowMap.value // 切换显示状态
  nextTick(() => {
    if (isShowMap.value) {
      const map = L.map('map'+props.job._id).setView([props.job.latitude.toString(), props.job.longitude.toString()], 9)
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
const props = defineProps<{ job: Job, isViewOnly: boolean, showAction: boolean }>()


// 创建一个响应式副本
let updatedJob = reactive({} as Job);

// 使用 watch 监听 job 的变化
watch(
  () => props.job,  // 监听 props.job 的变化
  (propJob) => {
    if (propJob) {
      // 使用 Object.assign 或 展开运算符将 propJob 的属性复制到 updatedJob
      updatedJob = { ...propJob }
      // 格式化日期字段（假设 propJob 中有 date 类型字段）
      if (updatedJob.advFrom) {
        updatedJob.advFrom = formatDate(updatedJob.advFrom);
      }
      if (updatedJob.advTo) {
        updatedJob.advTo = formatDate(updatedJob.advTo);
      }
    }
  },
  { immediate: true }  // 确保初始化时也会触发
);



async function handleSubmit() {
  const formData = new FormData()

  // 将 job 对象的所有属性添加到 formData 中
  for (const key in updatedJob) {
    formData.append(key, updatedJob[key])
  }
  formData.set('company', updatedJob.company._id)

  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }


  try {
    const response = await updateJob(formData);
    if (response.data.status === 200) {
      emit('refresh');
      ElNotification({
        title: 'Success',
        message: 'You Have Successfully Update Your Job!',
        type: 'success',
      })
      closeModal()
    } else {
      ElNotification({
        title: 'Error',
        message: 'Something went wrong!',
        type: 'error',
      })
    }
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: error.message,
      type: 'error',
    })
  }
}

async function handleDelete() {
  try {
    const response = await deleteJob(props.job._id);
    if (response.data.status === 200) {
      ElNotification({
        title: 'Success',
        message: 'You Have Successfully Delete the Job!',
        type: 'success',
      })
      emit('refresh');
    } else {
      ElNotification({
        title: 'Error',
        message: 'Something went wrong!',
        type: 'error',
      })
    }
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: error.message,
      type: 'error',
    })
  }
}



function closeModal() {
  const modalElement = document.getElementById('editJobModal' + props.job._id)
  const backdropElement = document.querySelector('.modal-backdrop')
  modalElement.classList.remove('show') // 强制移除 show 类
  // 手动移除 backdrop 元素
  if (backdropElement) {
    backdropElement.remove()
    document.body.classList.remove('modal-open')
  }
}
</script>

<style scoped lang="css"></style>
