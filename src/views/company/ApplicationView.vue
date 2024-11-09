<template>
  <div class="container">
    <el-table :data="applications" style="width: 100%" class="fs-5">
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
            {{applicationStep[scope.row.step]}}
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
          <el-button size="large" @click="handleEdit(scope.row)" class="fs-5">
            Approve
          </el-button>
          <el-button size="large" type="danger" @click="handleDelete(scope.row)" class="fs-5">
            End
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getApplicationByCompany } from '@/api/application'
import { convertISOToDate } from '../../utils/timeConverter'
import { applicationStep } from '@/enums/applicationStep'

const applications = ref([]); // 使用 ref 而不是 reactive




const handleEdit = (row: any) => {
  console.log('Editing:', row);
  // 在这里添加编辑逻辑
}

const handleDelete = (row: any) => {
  console.log('Deleting:', row);
  // 在这里添加删除逻辑
}

onMounted(async () => {
  await fetchApplications()
})

async function fetchApplications() {
  try {
    const response = await getApplicationByCompany();
    applications.value.push( response.data.data)
    console.log(applications.value);
  } catch (error) {
    console.error('Failed to fetch applications:', error);
  }
}
</script>

<style scoped lang="css">
/* 添加您的样式 */
</style>
