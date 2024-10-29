<template>
  <div id="job-view" class="my-3" >
    <div class="row m-0 p-0">
      <!--    搜索栏-->
      <div class="col-3 ">
        <div class="card p-3 shadow h-100">
          <div class="mt-2">
            <h3 class="fw-bold">Search Jobs</h3>
            <p class="text-muted">550 000+ Available job vacancies</p>
          </div>

          <div class="row m-0 p-0 g-0 mt-2">
            <form @submit.prevent="fetchSearchResult" class="col-12 d-flex mx-auto">
              <input type="search" class="form-control form-control-lg ds-input rounded-end-0" id="search-input"
                     placeholder="Search Jobs" v-model="keyword">
              <button class="btn btn-primary rounded-start-0" >Search</button>
            </form>

          </div>


          <p class="mt-4 fw-bold">Expected Working Region:</p>
          <el-cascader size="large" :options="pcaTextArr" placeholder="Region" v-model="selectedRegion" style="width: 100%"></el-cascader>

          <p class="mt-4 fw-bold">Expected Category:</p>
          <el-select v-model="value" placeholder="Category" size="large">
            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <p class="mt-4 fw-bold">Expected salary:</p>
          <el-select v-model="value" placeholder="Salary" size="large">
            <el-option v-for="item in salaries" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <p class="mt-4 fw-bold">Working Experience Required:</p>
          <el-select v-model="value" placeholder="Experience" size="large" class="mb-5">
            <el-option v-for="item in experience" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

        </div>
      </div>
      <!--    岗位卡片-->
      <div class="col-9">
        <CarouselCard></CarouselCard>

        <div class="row g-4 d-flex flex-wrap">
          <div class="col-4 flex-fill" v-for="(job,index) in jobs" :key="index">
            <JobCard  :job="job" class="h-100"></JobCard>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { pcaTextArr } from 'element-china-area-data'
import {ref} from 'vue'
import JobCard from '@/components/JobCard.vue'

import {jobs} from '@/mock/jobs'
import CarouselCard from '@/components/CarouselCard.vue'

const selectedRegion = ref()

const salaries = [
  {
    value: '0',
    label: 'All',
  },
  {
    value: '1',
    label: 'Below 3k',
  },
  {
    value: '2',
    label: '3-5K',
  },
  {
    value: '3',
    label: '5-10k',
  },
  {
    value: '4',
    label: '5-10k',
  },
  {
    value: '5',
    label: '10-20k',
  },
  {
    value: '6',
    label: '20-50k',
  },
  {
    value: '7',
    label: 'Above 50k',
  },

]

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

const experience = [
  {
    value: '0',
    label: 'All',
  },
  {
    value: '1',
    label: 'Current student',
  },
  {
    value: '2',
    label: 'Fresh graduate',
  },
  {
    value: '3',
    label: 'No experience needed',
  },
  {
    value: '4',
    label: 'Less than 1 year',
  },
  {
    value: '5',
    label: '1 - 3 years',
  },
  {
    value: '6',
    label: '3 - 5 years',
  },
  {
    value: '7',
    label: '5 - 10 years',
  },
  {
    value: '8',
    label: 'More than 10 years',
  },

]

</script>
