<template>
  <div class="h-100">
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#postJobModal"
      >
        Post a new job
      </button>

      <!--        添加模态框-->
      <div class="modal fade" id="postJobModal" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <form class="modal-content card p-4" @submit.prevent="handleSubmit">
            <div class="d-flex justify-content-between">
              <p
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#postJobModal"
              >
                <i class="bi bi-x-lg"></i>
              </p>
              <button class="btn btn-primary" type="submit">Add</button>
            </div>
            <h5 class="text-center mt-5">Job Position Information</h5>
            <div class="row py-2 gx-5 gy-3 mt-3">
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Website</p>
                <input
                  v-model="job.website"
                  type="text"
                  class="form-control"
                  placeholder="www.jofind.com"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Department</p>
                <input
                  v-model="job.department"
                  class="form-control"
                  placeholder="Engineering"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Job Title(role)</p>
                <input
                  v-model="job.role"
                  class="form-control"
                  placeholder="Front End Developer"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Experience Needed(year)</p>
                <input
                  v-model="job.experience"
                  type="number"
                  class="form-control"
                  placeholder="3"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Education Needed</p>
                <input
                  v-model="job.degree"
                  class="form-control"
                  placeholder="Master"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Working Location</p>
                <input
                  v-model="job.location"
                  class="form-control"
                  placeholder="Guangzhou, China"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Working Location Latitude</p>
                <input
                  v-model="job.latitude"
                  class="form-control"
                  placeholder="22.313"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Working Location Longitude</p>
                <input
                  v-model="job.longitude"
                  class="form-control"
                  placeholder="28.471"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Salary From (K/Month)</p>
                <input
                  v-model="job.salaryFrom"
                  type="number"
                  class="form-control"
                  placeholder="9"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Salary To (K/Month)</p>
                <input
                  v-model="job.salaryTo"
                  type="number"
                  class="form-control"
                  placeholder="15"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Start Receiving Resume From</p>
                <input
                  v-model="job.advFrom"
                  type="date"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Stop Receiving Resume From</p>
                <input
                  v-model="job.advTo"
                  type="date"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Briefly describe the job</p>
                <textarea
                  v-model="job.summary"
                  class="form-control"
                  style="min-height: 150px"
                  placeholder="A short paragraph describing the duties of the position."
                  required
                />
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Full Description</p>
                <textarea
                  v-model="job.description"
                  class="form-control"
                  style="min-height: 150px"
                  placeholder="Describe the job description in detail"
                  required
                />
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Requirements</p>
                <textarea
                  v-model="job.requirements"
                  class="form-control"
                  style="min-height: 150px"
                  placeholder="Describe the job requirement in detail"
                  required
                />
              </div>
            </div>

            <!--            公司基本信息-->
<!--            <h5 class="text-center mt-5">Company Information</h5>-->
<!--            <CompanyCard :company="company" :can-edit="false" />-->
<!--            <el-divider />-->
          </form>
        </div>
      </div>
    </div>

    <div class="row g-4 d-flex flex-wrap mt-3" v-if="jobsList.length > 0">
      <div class="col-4" v-for="job in jobsList" :key="job._id">
        <JobCard :job="job" :showAction="false" class="h-100" :is-view-only="false" @refresh="handleRefresh"></JobCard>
      </div>
    </div>
    <div class="d-flex justify-content-center h-100" v-else>
      <el-empty description="You have not posted any job." ></el-empty>
    </div>

  </div>
</template>

<script setup lang="ts">
import JobCard from '@/components/job/JobCard.vue'
import CompanyCard from '@/components/company/CompanyCard.vue'
import { onMounted, reactive, ref } from 'vue'
import { getJobsByCompanyId, updateJob } from '@/api/job'
import { ElNotification } from 'element-plus'
import { Job } from '@/types/Job'


const job = reactive({} as Job)

const jobsList = ref([]);
const user = JSON.parse(localStorage.getItem('user'));


onMounted(async ()=>{
  await fetchJobs()
})

async function fetchJobs() {
  try {
    const response = await getJobsByCompanyId(user.company);
    jobsList.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
  }
}

const handleRefresh = async () => {
  await fetchJobs()
};

async function handleSubmit() {
  const formData = new FormData()

  // 将 job 对象的所有属性添加到 formData 中
  for (const key in job) {
    formData.append(key, job[key])
  }
  formData.append('company', user.company)

  try {
    const response = await updateJob(formData)
    if (response.data.status === 200) {
      await fetchJobs()
      ElNotification({
        title: 'Success',
        message: 'You Have Successfully Update the Job!',
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
      message: error,
      type: 'error',
    })
  }
}

function closeModal() {
  const modalElement = document.getElementById('postJobModal')
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
