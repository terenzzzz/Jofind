<!--TODO-->
<template>
  <div id="projectCard">
    <div class="card border-1 p-3 my-2">
      <div class="d-flex justify-content-between py-2">
        <p class="fw-bold fs-5">{{ project.title }}</p>
        <p>{{convertISOToDate(project.startDate) }} - {{convertISOToDate(project.endDate)}}</p>
      </div>
      <p class="my-2"><strong class="fw-bold">Project Role:</strong> {{ project.role }}</p>
      <p class="my-2">
        <strong class="fw-bold">Project Description:</strong>
        {{ project.description }}
      </p>
      <p class="my-2" v-if="project.performance !== ''">
        <strong class="fw-bold">Project Performance:</strong>
        {{ project.performance }}
      </p>
      <p class="my-2" v-if="project.url !== ''">
        <strong class="fw-bold">Project Link:</strong>
        {{ project.url }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { convertISOToDate } from '@/utils/timeConverter'

interface Project {
  title: string
  startDate: Date
  endDate: Date
  role: string
  description: string
  performance?: string
  url?: string
}

// 使用 defineProps 来接收 job prop
defineProps<{ project: Project }>()
</script>

<style scoped lang="css"></style>
