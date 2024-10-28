<template>
  <div class="card rounded-3 p-3 shadow">
    <!--    公司信息-->
    <div class="d-flex flex-row justify-content-between align-items-center">
      <div
        class="img-container border border-2 p-2"
        style="height: 80px; width: 80px"
      >
        <img :src="job.company.logo" class="img-fluid" />
      </div>

      <div class="company d-flex flex-column justify-content-center">
        <h5 class="fw-bold">{{ job.company.name }}</h5>
        <p class="text-muted">{{ job.company.location }}</p>
      </div>

<!--      <button class="btn btn-light">-->
<!--        <i class="bi bi-bookmark-star fs-5 text-warning"></i>-->
<!--      </button>-->
    </div>

    <!--    标签列表-->
    <div class="row d-flex flex-row g-1">
      <div class="col-auto" v-for="tag in job.tags" :key="tag._id">
        <TagButton :tag="tag"></TagButton>
      </div>
    </div>

    <!--    岗位-->
    <h5 class="fw-bold mt-5">{{ job.position }}</h5>

    <!--    岗位描述-->
    <p class="text-muted mb-5">
      {{ job.description }}
    </p>

    <!--    薪水-->
    <div class="d-flex justify-content-between align-items-baseline">
      <p class="m-0"><strong class="fs-4 text-primary">${{ job.salary }}</strong>/Month</p>

      <button class="btn btn-outline-primary btn-sm">Apply Now</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagButton from '@/components/TagButton.vue'
import { defineProps } from 'vue'

interface Company {
  name: string
  location: string
  logo: string // 这里假设 logo 是一个相对于项目根目录的路径
  favoriteIcon: string // 图标类名
}

interface Tag {
  _id: number
  name: string
}

interface Job {
  id: number
  company: Company
  tags: Tag[]
  position: string
  description: string
  salary: string // 薪资可以是一个字符串，因为它可能包含非数字字符（如货币符号）
}

// 使用 defineProps 来接收 job prop
defineProps<{ job: Job }>()
</script>

<style scoped lang="css"></style>
