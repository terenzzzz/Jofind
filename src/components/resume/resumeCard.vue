

<template>
  <div :class="isCard?'card p-5 border border-1 rounded-3 shadow': ''">
    <!--    个人基本信息-->
    <div class="row g-4">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title text-center text-muted">Resume</h5>
      </div>
      <div class="col-12 order-1 col-md-10 order-md-0 row mt-5">
        <h1>{{ resume.name }}</h1>
        <div class="col-6 g-3 row">
          <li class="col-auto">
            <i class="bi bi-mortarboard-fill me-1"></i
            >{{ resume.topDegree }}
          </li>
          <li class="col-auto">
            <i class="bi bi-cake-fill me-1"></i>{{ resume.birth }}
          </li>
          <li class="col-auto">
            <i class="bi bi-telephone-fill me-1"></i>{{ resume.phone }}
          </li>
          <li class="col-auto">
            <i class="bi bi-envelope-fill me-1"></i>{{ resume.email }}
          </li>
          <li class="col-auto">
            <i class="bi bi-geo-alt-fill me-1"></i>{{ resume.location }}
          </li>
        </div>
      </div>
      <div class="col-4 order-0 mx-auto col-md-2 order-md-1">
        <img :src="resume.avatar? 'data:image/png;base64,' + resume.avatar: ''" class="img-fluid" />
      </div>
    </div>
    <!--        个人优势-->
    <div class="row mt-5">
      <h3 class="bottom-border">Self-evaluation</h3>
      <p>{{ resume.selfEvaluation }}</p>
    </div>

    <!--        期望职位-->
    <div class="row mt-5">
      <h3 class="bottom-border">Desired position</h3>
      <ul>
        <li class="my-2" v-for="(job,index) in resume.desiredJobs" :key="index">
          {{ job.role }} | {{job.salaryFrom}}K - {{job.salaryTo}}K | {{job.location}}
        </li>
      </ul>
    </div>

    <!--        工作实习经历-->
    <div class="row mt-5">
      <h3 class="bottom-border">Work/internship experience</h3>
      <div v-for="(job, index) in resume.workExperiences" :key="index">
        <JobExperience :jobExperience="job"></JobExperience>
      </div>
    </div>

    <!--       项目经历-->
    <div class="row mt-5">
      <h3 class="bottom-border">Project experience</h3>
      <div v-for="(project, index) in resume.projectExperiences" :key="index">
        <ProjectCard :project="project"></ProjectCard>
      </div>
    </div>

    <!--       教育经历-->
    <div class="row mt-5">
      <h3 class="bottom-border">Education</h3>
      <div v-for="(education, index) in resume.educationExperiences" :key="index">
        <EducationCard :education="education"></EducationCard>
      </div>
    </div>

    <!--       语言能力-->
    <div class="row mt-5">
      <h3 class="bottom-border">Education</h3>
      <div v-for="(lang, index) in resume.languageExperience" :key="index">
        <LanguageCard :language="lang"></LanguageCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive  } from 'vue'
import ProjectCard from '@/components/resume/ProjectCard.vue'
import JobExperience from '@/components/resume/JobExperienceCard.vue'
import EducationCard from '@/components/resume/EducationCard.vue'
import LanguageCard from '@/components/resume/LanguageCard.vue'
import type { Resume } from '@/types/Resume'



const props = defineProps<{ resume: Resume, isCard: boolean }>();
const resume = reactive(props.resume);
</script>

<style scoped lang="css">

</style>
