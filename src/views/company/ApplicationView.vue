

<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Date">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" />
      <el-table-column label="Job Applying" >
        <template #default="scope">
          <a>{{ scope.row.job }}</a>
        </template>
      </el-table-column>
      <el-table-column label="Status" >
        <template #default="scope">
          <el-tag>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="large" @click="handleEdit(scope.$index, scope.row)">
            Approve
          </el-button>
          <el-button
            size="large"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            End
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    job: 'Front-End Developer',
    status: 'Applied',
  },
  {
    date: '2016-05-03',
    name: 'Terence',
    job: 'Front-End Developer',
    status: 'Contracting',
  },
]
</script>

<style scoped lang="css">

</style>
