<template>
  <div id="job-view" class="my-3">
    <div class="row m-0 p-0" style="min-height: 80vh">
      <!--    搜索栏-->
      <div class="col-3 ">
        <div class="card p-3 shadow h-100">
          <div class="mt-2">
            <h3 class="fw-bold">Search Jobs</h3>
            <p class="text-muted">{{jobsList.length}} Available job vacancies</p>
          </div>

          <div class="row m-0 p-0 g-0 mt-2">
            <form @submit.prevent="fetchSearchResult" class="col-12 d-flex mx-auto">
              <input type="search" class="form-control form-control-lg ds-input rounded-end-0" id="search-input"
                     placeholder="Keywords" v-model="keyword">
              <button class="btn btn-primary rounded-start-0">Search</button>
            </form>

          </div>


          <p class="mt-4 fw-bold">Expected Working Region:</p>
          <el-cascader size="large" :options="pcaTextArr" placeholder="Region" v-model="selectedRegion" style="width: 100%" disabled></el-cascader>

          <p class="mt-4 fw-bold">Expected Category:</p>
          <el-select v-model="value" placeholder="Category" size="large" disabled>
            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>

          <p class="mt-4 fw-bold">Expected salary:</p>
          <el-select v-model="selectedSalary" placeholder="Salary" size="large" @change="handleSalaryChange">
            <el-option v-for="item in salaries" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <p class="mt-4 fw-bold">Working Experience Required:</p>
          <el-select v-model="selectedWorkExperience" placeholder="Experience" size="large" class="mb-5" @change="handleWorkExperienceChange">
            <el-option v-for="item in workExperience" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

        </div>
      </div>
      <!--    岗位卡片-->
      <div class="col-9">
        <CarouselCard></CarouselCard>

        <div class="row g-4 d-flex flex-wrap">
          <div class="col-4" v-for="job in filteredJobs" :key="job._id">
            <JobCard :job="job" class="h-100" :is-view-only="true" :show-action="true" :is-viewable="true"></JobCard>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { pcaTextArr } from 'element-china-area-data'
import { onMounted, ref } from 'vue'
import JobCard from '@/components/job/JobCard.vue'
import CarouselCard from '@/components/CarouselCard.vue'
import { getJobs, getJobsByRole } from '@/api/job'
import { workExperience } from '@/enums/workExperience'
import { salaries } from '@/enums/salary'

const jobsList = ref([]);

const filteredJobs = ref([]);

onMounted(async () => {
  // status.value = await getSeekingStatus()
  await fetchJobs()
})

async function fetchJobs() {
  try {
    const response = await getJobs()
    jobsList.value = response.data.data
    filteredJobs.value = jobsList.value
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}


const selectedRegion = ref()
const categories = [
  {
    value: '0',
    label: 'All',
  },
  {
    value: '1',
    label: 'Part-Time',
  },
  {
    value: '2',
    label: 'Intern',
  },
  {
    value: '3',
    label: 'Full-Time',
  },

]


const keyword = ref('')
async function fetchSearchResult(){
  try {
    const response = await getJobsByRole(keyword.value)
    jobsList.value = response.data.data
    filteredJobs.value = jobsList.value
    selectedWorkExperience.value = workExperience[0]?.value
    selectedSalary.value = salaries[0]?.value
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}

const selectedWorkExperience = ref(workExperience[0]?.value)
const selectedSalary = ref(salaries[0]?.value)

const filters = ref({
  salary: '0',  // 默认 '0'
  experience: '0',  // 默认 '0'
});

// 更新薪资过滤条件
const handleSalaryChange = (newValue) => {
  filters.value.salary = newValue;
  filteredJobs.value = filterJobs(); // 每当某个过滤器变化时，重新调用过滤函数
};

// 更新工作经验过滤条件
const handleWorkExperienceChange = (newValue) => {
  filters.value.experience = newValue;
  filteredJobs.value = filterJobs(); // 每当某个过滤器变化时，重新调用过滤函数
};

// 定义过滤范围
const salaryRanges = {
  '1': [0, 3],
  '2': [3, 5],
  '3': [5, 10],
  '4': [10, 20],
  '5': [20, 50],
  '6': [50, Infinity],
};

const experienceRanges = {
  '1': [0, 0],  // Current student
  '2': [0, 0],  // Fresh graduate
  '3': [0, 0],  // No experience needed
  '4': [0, 1],  // Less than 1 year
  '5': [1, 3],  // 1 - 3 years
  '6': [3, 5],  // 3 - 5 years
  '7': [5, 10], // 5 - 10 years
  '8': [10, Infinity],  // More than 10 years
};

// 定义通用的过滤方法
const filterJobs = () => {
  let filtered = [...jobsList.value]; // 从所有职位开始

  // 薪资过滤
  if (filters.value.salary !== '0') {
    const [minSalary, maxSalary] = salaryRanges[filters.value.salary];
    filtered = filtered.filter(job =>
      (job.salaryFrom >= minSalary && job.salaryFrom <= maxSalary) ||
      (job.salaryTo >= minSalary && job.salaryTo <= maxSalary) ||
      (job.salaryFrom <= minSalary && job.salaryTo >= maxSalary)
    );
  }

  // 工作经验过滤
  if (filters.value.experience !== '0') {
    const [minExperience, maxExperience] = experienceRanges[filters.value.experience];
    filtered = filtered.filter(job =>
      job.experience >= minExperience && job.experience <= maxExperience
    );
  }

  return filtered;
};

</script>
