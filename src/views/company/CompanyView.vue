<template>
  <div id="seeker-profile" class="">
    <div class="row ">

      <div class="card p-5 border-0">
        <!--    公司基本信息-->
        <CompanyCard :company="company" :can-edit="true"/>
        <el-divider />

        <!--        状态信息-->
        <div class="row">
          <div class="col-4">
            <div class="card rounded-3 p-3">
              <h1 class="fw-bold">10</h1>
              <p>Application need to be managed</p>
            </div>
          </div>

          <div class="col-4">
            <div class="card rounded-3 p-3">
              <h1 class="fw-bold">10</h1>
              <p>Message unread</p>
            </div>
          </div>

          <div class="col-4">
            <div class="card rounded-3 p-3">
              <h1 class="fw-bold">10</h1>
              <p>Job Posted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--    个人简历-->
  <div class="row mt-5"></div>
</template>

<script setup lang="ts">
import { useTransition } from '@vueuse/core'
import CompanyCard from '@/components/company/CompanyCard.vue'
import { onMounted, onUpdated, ref } from 'vue'
import { getCompanyById } from '@/api/company'


const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1000,
})
source.value = 10

const company = ref({})

onMounted(async () => {
  // status.value = await getSeekingStatus()
  await fetchCompany()
})

// onUpdated(async () => {
//   // status.value = await getSeekingStatus()
//   await fetchCompany()
// })

async function fetchCompany() {
  try {
    const response = await getCompanyById()
    company.value = response.data.data

  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}







</script>

