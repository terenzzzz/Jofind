<template>
  <div id="overall" class="container">
    <!--    应聘记录-->
    <div class="card mt-4 rounded-3 border-0">
      <div v-if="applicationsList.length>0">
        <div v-for="(application, index) in applicationsList" :key="index">
          <ApplyRecordCard :application="application"></ApplyRecordCard>
        </div>
      </div>

      <div v-else>
        <el-empty description="You did not apply any jobs yet">
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ApplyRecordCard from '@/components/profile/ApplyRecordCard.vue'
import { onMounted, ref } from 'vue'

import { getApplicationByUser } from '@/api/application'

const applicationsList = ref([]);

onMounted(async () => {
  // status.value = await getSeekingStatus()
  await fetchApplications()
})

async function fetchApplications() {
  try {
    const response = await getApplicationByUser()
    applicationsList.value = response.data.data
    // console.log(applicationsList.value)
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}


</script>

<style scoped lang="css"></style>
