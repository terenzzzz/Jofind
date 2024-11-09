<template>
  <div class="px-3">
    <el-table :data="applications" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column type="index" label=""/>
      <el-table-column prop="user.name" label="Candidate Name" />
      <el-table-column prop="job.role" label="Job" >
        <template v-slot="scope" >
          <p >{{scope.row.job.role}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Step" >
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
            <el-button type="primary" size="small" @click="handleNextStep" v-if="!scope.row.isClosed">
              Next Step
            </el-button>
            <el-button  type="danger" size="small" @click="handleClose(scope.row)" v-if="!scope.row.isClosed">Close</el-button>
            <el-button  type="success" size="small" @click="handleClose(scope.row)" v-else>Reactive</el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>


</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getApplicationByCompany, updateApplicationClosed } from '@/api/application'
import { convertISOToDate } from '../../utils/timeConverter'
import { applicationStep } from '@/enums/applicationStep'
import { updateCompany } from '@/api/company'
import { ElNotification } from 'element-plus'

const applications = ref([]); // 使用 ref 而不是 reactive


const tableRowClassName = ({ row }) => {
  if (row.isClosed) {
    return 'danger-row'
  }
  return ''
}

const handleNextStep = (row: any) => {
  console.log('Editing:', row);
  // 在这里添加编辑逻辑
}

const handleClose = async (row: any) => {
  console.log('Deleting:', row);
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
    applications.value = []
    applications.value.push( response.data.data)
    console.log(applications.value);
  } catch (error) {
    console.error('Failed to fetch applications:', error);
  }
}

// async function updateApplicationClosed() {
//   try {
//     const formData = new FormData();
//     formData.append('application', updatedCompany._id);
//     formData.append('isClosed', );
//
//     const response = await updateCompany(formData);
//     applications.value.push( response.data.data)
//     console.log(applications.value);
//   } catch (error) {
//     console.error('Failed to fetch applications:', error);
//   }
// }
</script>

<style lang="css">
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style>


