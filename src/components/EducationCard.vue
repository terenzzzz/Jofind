<template>
  <div id="projectCard">
    <div class="card border-0 p-3 my-2">
      <div class="d-flex justify-content-between py-2">
        <p class="fw-bold fs-5">{{ education.school }}</p>
        <p>{{convertISOToDate(education.startDate) }} - {{convertISOToDate(education.endDate)}}</p>
      </div>
      <div class="d-flex justify-content-between py-2">
        <div class="d-flex flex-column">
          <p class="text-muted">Degree</p>
          <p>{{ education.degree }}</p>
        </div>

        <div class="d-flex flex-column">
          <p class="text-muted">Major</p>
          <p>{{ education.major }}</p>
        </div>


        <div class="d-flex flex-column">
          <p class="text-muted">Rank</p>
          <p>{{ education.rank? education.rank : 'Not Given' }}</p>
        </div>
      </div>

      <div class="mt-3">
        <p class="text-muted">Course Including</p>
        <button class="rounded-3 btn btn-light my-1 me-2" v-for="(course,index) in education.course" :key="index" disabled>{{ course }}</button>
      </div>

      <div class="mt-3">
        <p class="text-muted">Experience in School</p>
        <p>{{education.schoolExperience}}</p>
      </div>
    </div>

    <el-divider></el-divider>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { convertISOToDate } from '@/utils/timeConverter'


interface Education {
  school: string
  degree: string
  major: string
  startDate: Date
  endDate: Date
  rank?: string
  course: []
  schoolExperience?: string
}

defineProps<{ education: Education }>()
</script>

<style scoped lang="css"></style>
