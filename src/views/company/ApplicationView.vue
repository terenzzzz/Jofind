<template>
  <div class="px-3">
    <h3 class="text-center mb-3">Applications</h3>
    <el-table :data="applications" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column type="index" label=""/>
      <el-table-column prop="user.name" label="Candidate Name" >
        <template v-slot="scope" >
          <el-button class="btn btn-outline-primary"
                     @click="fetchResumeByUser(scope.row.user._id)"
                     data-bs-toggle="modal"
                     data-bs-target="#resumePreview">
            {{scope.row.user.name}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="job.role" label="Job" >
        <template v-slot="scope" >
          <el-button class="btn btn-outline-primary"
                     @click="fetchJobById(scope.row.job._id)"
                     data-bs-toggle="modal"
                     data-bs-target="#jobPreview">
            {{scope.row.job.role}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="Current Step" >
        <template v-slot="scope" >
          <el-tag type="primary" class="fs-6">
            {{scope.row.isClosed?'Closed':applicationStep[scope.row.step]}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="Last Update">
        <template v-slot="scope">
          {{ convertISOToDate(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
            <el-button type="primary" size="small" @click="handleNextStep(scope.row)" v-if="!scope.row.isClosed">
              Next Step
            </el-button>
            <el-button  type="danger" size="small" @click="handleClose(scope.row)" v-if="!scope.row.isClosed">Close</el-button>
            <el-button  type="success" size="small" @click="handleClose(scope.row)" v-else>Reactive</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

  <!--  申请人简历模态框-->
  <div class="modal fade" id="resumePreview" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <resume-card :resume="currentResume" :is-card="true"></resume-card>
      </div>
    </div>
  </div>



  <!--  申请岗位预览模态框-->
  <div class="modal fade" id="jobPreview" tabindex="-1">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <job-card :job="currentJob" :is-view-only="true" :show-action="false"/>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getApplicationByCompany, updateApplicationClosed, updateApplicationStep } from '@/api/application'
import { convertISOToDate } from '../../utils/timeConverter'
import { applicationStep } from '@/enums/applicationStep'
import { ElNotification, ElMessageBox } from 'element-plus'
import ResumeCard from '@/components/resume/resumeCard.vue'
import { getResumeByUser } from '@/api/resume'
import { getJobById } from '@/api/job'
import JobCard from '@/components/job/JobCard.vue'



const applications = ref([]);
const currentResume = reactive({
  name: '',
  birth: '',
  email: '',
  topDegree: '',
  phone: '',
  location: '',
  selfEvaluation: '',
  avatar: '',
  desiredJobs: [],
  workExperiences: [],
  projectExperiences: [],
  educationExperiences: [],
  languageExperience: [],
})

const currentJob = reactive({})

const tableRowClassName = ({ row }) => {
  if (row.isClosed) {
    return 'danger-row'
  }
  return ''
}

const handleNextStep = async (row: any) => {
  if (row.step >= 4){
    return ElMessageBox.alert('This is the final step of the process, if you confirm this step is done, you can closed the application.', 'Tips', {
      confirmButtonText: 'OK',
    })
  }

  const formData = new FormData();
  formData.append('application', row._id);
  formData.append('step', row.step+1);

  try {
    const response = await updateApplicationStep(formData);
    if (response.data.status === 200) {
      ElNotification({
        title: 'Success',
        message: 'You Have Successfully Update the Application!',
        type: 'success',
      })
      await fetchApplications()
    } else {
      ElNotification({
        title: 'Error',
        message: 'Something went wrong!',
        type: 'error',
      })
    }
  } catch (error) {
    alert("An error occurred: " + error.message);
    ElNotification({
      title: 'Error',
      message: 'Something went wrong!',
      type: 'error',
    })
  }
}

const handleClose = async (row: any) => {
  const formData = new FormData();
  formData.append('application', row._id);
  formData.append('isClosed', !row.isClosed);

  try {
    const response = await updateApplicationClosed(formData);
    if (response.data.status === 200) {
      ElNotification({
        title: 'Success',
        message: 'You Have Successfully Update the Application!',
        type: 'success',
      })
      await fetchApplications()
    } else {
      ElNotification({
        title: 'Error',
        message: 'Something went wrong!',
        type: 'error',
      })
    }
  } catch (error) {
    alert("An error occurred: " + error.message);
    ElNotification({
      title: 'Error',
      message: 'Something went wrong!',
      type: 'error',
    })
  }
}

onMounted(async () => {
  await fetchApplications()
})

async function fetchApplications() {
  try {
    const response = await getApplicationByCompany();
    applications.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch applications:', error);
  }
}

async function fetchResumeByUser(user) {
  try {
    const response = await getResumeByUser(user)
    if (response.data.data){
      Object.assign(currentResume, response.data.data)
    }
  } catch (error) {
    console.error('Failed to fetch Resume:', error)
  }
}

async function fetchJobById(user) {
  try {
    const response = await getJobById(user)
    if (response.data.data){
      Object.assign(currentJob, response.data.data)
      console.log(response.data.data)
    }
  } catch (error) {
    console.error('Failed to fetch Job:', error)
  }
}
</script>

<style lang="css">
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style>


