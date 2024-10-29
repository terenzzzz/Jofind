<template>
  <div id="overall" class="container">

<!--    基本个人信息-->
    <div class="card p-3 rounded-3">
      <div class="row">
        <div class="col-4 mx-auto col-md-2">
          <img src="../../assets/beluga.jpg" class="img-fluid">
        </div>
        <div class="col-12 col-md-10 p-3">
          <div class="d-flex justify-content-between">
            <h3>Beluga</h3>
            <el-select
              v-model="selectedSttatus"
              placeholder="Status"
              size="default"
              style="width: 180px"
            >
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div class="d-flex mt-2">
            <li><i class="bi bi-briefcase-fill me-1"></i>Fresh Graduate</li>
            <li class="mx-5"><i class="bi bi-mortarboard-fill me-1"></i>Master</li>
            <li><i class="bi bi-building-fill me-1"></i>The University of Sheffield</li>
          </div>
          <div class="d-flex mt-3">
            <li><i class="bi bi-telephone-fill me-1"></i>13538991133</li>
            <li class="ms-5"><i class="bi bi-envelope-fill me-1"></i>terence592592@gmail.com</li>
          </div>
        </div>
      </div>

    </div>

<!--    应聘记录-->
    <div class="card mt-4 rounded-3 border-0">
      <div v-for="(job, index) in jobs" :key="index">
        <ApplyRecordCard :job="job" :step="1"></ApplyRecordCard>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ApplyRecordCard from '@/components/profile/ApplyRecordCard.vue'
import { jobs } from '@/mock/jobs'

const status = [
  {
    value: '0',
    label: '观望',
  },
  {
    value: '1',
    label: '接受新机会',
  },
  {
    value: '2',
    label: '积极找工作',
  },

]
const selectedSttatus = ref("接受新机会")
</script>


<style scoped lang="css">

</style>
