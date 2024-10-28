<template>
  <div id="projectCard">
    <div class="card border-1 p-3 my-2">
      <div class="d-flex justify-content-between py-2">
        <p
          class="fw-bold fs-5">{{ jobExperience.company }}
          <span class="badge text-bg-primary ms-2" v-if="jobExperience.isIntern">Internship</span>
        </p>
        <p>{{convertISOToDate(jobExperience.startDate) }} - {{convertISOToDate(jobExperience.endDate)}}</p>
      </div>
      <div class="d-flex justify-content-between py-2">
        <p class="my-2"><strong class="fw-bold">Job Industry:</strong> {{ jobExperience.industry }}</p>
        <p class="my-2"><strong class="fw-bold">Job Department:</strong> {{ jobExperience.department }}</p>
        <p class="my-2"><strong class="fw-bold">Job Title:</strong> {{ jobExperience.jobTitle }}</p>
      </div>

      <p class="my-2">
        <strong class="fw-bold">Job Content:</strong>
        {{ jobExperience.content }}
      </p>
      <p class="my-2" v-if="jobExperience.performance !== ''">
        <strong class="fw-bold">Job Performance:</strong>
        {{ jobExperience.performance }}
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { convertISOToDate } from '@/utils/timeConverter'

interface JobExperience {
  company: string
  industry: string
  department: string
  jobTitle: string
  startDate: Date
  endDate: Date
  content: string
  performance?: string
  isIntern: boolean
}

defineProps<{ jobExperience: JobExperience }>()
</script>

<style scoped lang="css"></style>
