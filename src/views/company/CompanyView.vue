<template>
  <div id="seeker-profile" class="">
    <div class="row">
      <div class="card p-5 border-0">
        <!--    公司基本信息-->
        <CompanyCard :company="company" :can-edit="true" />
        <el-divider />

        <!--        状态信息-->
        <div class="row">
          <div class="col-4">
            <div class="card rounded-3 p-3">
              <h1 class="fw-bold">{{ numApplications }}</h1>
              <p>Applications</p>
            </div>
          </div>

          <div class="col-4">
            <div class="card rounded-3 p-3">
              <h1 class="fw-bold">{{numChat}}</h1>
              <p>Chats</p>
            </div>
          </div>

          <div class="col-4">
            <div class="card rounded-3 p-3">
              <h1 class="fw-bold">{{ numJobPosted }}</h1>
              <p>Jobs Posted</p>
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
import { getJobsByCompanyId } from '@/api/job'
import { getApplicationByCompany } from '@/api/application'
import { getChatRoomByCompany } from '@/api/chat'

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1000,
})
source.value = 10

const company = ref({})

onMounted(async () => {
  // status.value = await getSeekingStatus()
  await fetchCompany()
  await fetchJobs()
  await fetchApplications()
  await fetchChat()
})

async function fetchCompany() {
  try {
    const response = await getCompanyById()
    company.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}

const numJobPosted = ref(0)

async function fetchJobs() {
  try {
    const response = await getJobsByCompanyId(company.value._id)
    numJobPosted.value = response.data.data.length
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
  }
}

const numApplications = ref(0)
async function fetchApplications() {
  try {
    const response = await getApplicationByCompany()
    numApplications.value = response.data.data.length
  } catch (error) {
    console.error('Failed to fetch applications:', error)
  }
}

const numChat = ref(0)
async function fetchChat() {
  try {
    const response = await getChatRoomByCompany()
    numChat.value = response.data.data.length
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}
</script>
