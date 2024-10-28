<template>
  <div id="seeker-profile" class="container">

    <div class="row mt-5">
      <div class="card p-5 border border-1 rounded-3 shadow">
        <!--    个人基本信息-->
        <div class="row mt-5 g-4">
          <div class="col-12 order-1 col-md-10 order-md-0">
            <h3>蒋志聪</h3>
            <div class="d-flex mt-5">
              <li><i class="bi bi-briefcase-fill me-1"></i>Fresh Graduate</li>
              <li class="mx-5"><i class="bi bi-mortarboard-fill me-1"></i>Master</li>
              <li><i class="bi bi-car-front-fill me-1"></i>Be on duty anytime</li>
            </div>
            <div class="d-flex mt-3">
              <li><i class="bi bi-telephone-fill me-1"></i>13538991133</li>
              <li class="ms-5"><i class="bi bi-envelope-fill me-1"></i>terence592592@gmail.com</li>
            </div>
          </div>
          <div class="col-4 order-0 mx-auto col-md-2 order-md-1">
            <img src="@/assets/avatar.jpg" class="img-fluid">
          </div>

        </div>
<!--        个人优势-->
        <div class="row mt-5">
          <h3 class="bottom-border">Personal advantage</h3>
          <p>本人工作勤奋主动，学习能力强，有强烈责任心，能自主学习钻研与工作相关的知识和技术；能够快速适应各种工作环境，具有良好的团队精神，敬业精神和沟通协调能力，为人诚恳，踏实能干，认真负责，敢于面对困难和挑战。对软件开发和 Web前端后端开发有持续的热情，喜欢探索和钻研新产品，有志在该领域长足发展。</p>
        </div>

<!--        期望职位-->
        <div class="row mt-5">
          <h3 class="bottom-border">Desired position</h3>
          <ul>
            <li class="my-2">Front End Develop | 7-12k | 广州</li>
            <li class="my-2">Back End Develop | 9-14k | 广州</li>
            <li class="my-2">operation and maintenance | 6-8k | 广州</li>
          </ul>
        </div>

<!--        工作实习经历-->
        <div class="row mt-5">
          <h3 class="bottom-border">Work/internship experience</h3>
          <div v-for="(job,index) in jobExperience" :key="index">
            <JobExperience :jobExperience="job"></JobExperience>
          </div>
        </div>

        <!--       项目经历-->
        <div class="row mt-5">
          <h3 class="bottom-border">Project experience</h3>
          <div v-for="(project,index) in projects" :key="index">
            <ProjectCard :project="project"></ProjectCard>
          </div>
        </div>

        <!--       教育经历-->
        <div class="row mt-5">
          <h3 class="bottom-border">Education</h3>
          <div v-for="(education,index) in educations" :key="index">
            <EducationCard :education="education"></EducationCard>
          </div>
        </div>

      </div>
    </div>
    </div>

  <!--    个人简历-->
    <div class="row mt-5">

    </div>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/mock/projects'
import { jobExperience } from '@/mock/jobExperience'
import { educations } from '@/mock/educations'
import JobExperience from '@/components/JobExperienceCard.vue'
import EducationCard from '@/components/EducationCard.vue'

</script>

<style scoped lang="css">

</style>
