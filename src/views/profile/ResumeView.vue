<template>
  <div id="seeker-profile" class="container">

    <div class="row mt-3">
      <div class="card p-5 border border-1 rounded-3 shadow">
        <!--    个人基本信息-->
        <div class="row g-4">
          <div class="col-12 order-1 col-md-10 order-md-0">
            <h1>Beluga</h1>
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
            <img src="../../assets/beluga.jpg" class="img-fluid">
          </div>

        </div>
<!--        个人优势-->
        <div class="row mt-5">
          <h3 class="bottom-border">Self-evaluation</h3>
          <p>I am diligent and active in work, have strong learning ability and strong sense of responsibility, and can independently study and study job-related knowledge and technology; Able to quickly adapt to various working environments, with good team spirit, professionalism and communication and coordination skills, sincere, practical and capable, serious and responsible, dare to face difficulties and challenges. Have a continuous passion for software development and Web front-end and back-end development, like to explore and study new products, and have the ambition to develop in this field.</p>
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

        <!--       语言能力-->
        <div class="row mt-5">
          <h3 class="bottom-border">Education</h3>
          <div v-for="(lang,index) in languages" :key="index">
            <LanguageCard :language="lang"></LanguageCard>
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
import ProjectCard from '@/components/resume/ProjectCard.vue'
import { projects } from '@/mock/resume/projects'
import { jobExperience } from '@/mock/resume/jobExperience'
import { educations } from '@/mock/resume/educations'
import { languages } from '@/mock/resume/languages'
import JobExperience from '@/components/resume/JobExperienceCard.vue'
import EducationCard from '@/components/resume/EducationCard.vue'
import LanguageCard from '@/components/resume/LanguageCard.vue'

</script>

<style scoped lang="css">

</style>
