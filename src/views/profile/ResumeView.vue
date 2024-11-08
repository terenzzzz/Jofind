<template>
  <div id="seeker-profile" class="container h-100">

    <div class="row mt-3 h-100">
      <div class="card p-5 border border-1 rounded-3 shadow" v-if="resume">
        <!--    个人基本信息-->
        <div class="row g-4">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title text-center text-muted">My Resume</h5>
            <button class="btn btn-outline-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#updateResume">
              Edit
            </button>
          </div>
          <div class="col-12 order-1 col-md-10 order-md-0 row mt-5">
            <h1>Beluga</h1>
            <div class="col-6 g-3 row">
              <li class="col-auto"><i class="bi bi-mortarboard-fill me-1"></i>Master</li>
              <li class="col-auto"><i class="bi bi-cake-fill me-1"></i>2000-12-24</li>
              <li class="col-auto"><i class="bi bi-telephone-fill me-1"></i>13538991133</li>
              <li class="col-auto"><i class="bi bi-envelope-fill me-1"></i>terence592592@gmail.com</li>
              <li class="col-auto"><i class="bi bi-geo-alt-fill me-1"></i>Guangzhou</li>
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
      <div v-else>
        <el-empty description="You don't have a resume yet">
          <button
            class="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#updateResume"
          >
            Update Resume
          </button>
        </el-empty>
      </div>
    </div>
  </div>


  <!--        添加模态框-->
  <div class="modal fade" id="updateResume" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <form class="modal-content card p-5" @submit.prevent="handleUpdate">
        <div class="d-flex justify-content-between">
          <p
            class="btn"
            data-bs-toggle="modal"
            data-bs-target="#postJobModal"
          >
            <i class="bi bi-x-lg"></i>
          </p>
          <button class="btn btn-primary" type="submit">Update</button>
        </div>
        <h5 class="text-center mt-5">Updating Resume</h5>

        <div class="d-flex mt-5 align-items-center">
          <div class="img-container border border-2 p-2" style="height: 100px; width: 100px">
            <img :src="newAvatarPreview? newAvatarPreview:''" class="img-fluid" />
          </div>
          <div class="mb-3 ms-3">
            <label for="formFileSm" class="form-label">Upload Your Photo</label>
            <input class="form-control form-control-sm" id="formFileSm" type="file" @change="onFileChange">
          </div>
        </div>

<!--        基本信息填写-->
        <div class="row py-2 gx-5 gy-3 mt-3">
          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Name</p>
            <input

              type="text"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Email</p>
            <input

              type="text"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Top Degree</p>
            <input

              type="text"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Phone</p>
            <input

              type="text"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Living Location</p>
            <input

              type="text"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-12 d-flex flex-column">
            <p class="text-muted">Self-evaluation</p>
            <textarea style="min-height: 150px" class="form-control" required/>
          </div>
        </div>

<!--        期望工作-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Desired Position</h5>
            <p class="text-primary" @click="handleDesiredJobAdd" style="cursor: pointer">Add</p>
          </div>
          <div class="row py-2 gx-5 gy-3 mt-3" v-for="(job,index) in resume.desiredJobs" :key="index">
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Job Role</p>
              <input

                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Salary From</p>
              <input

                type="number"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Salary To</p>
              <input

                type="number"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Location</p>
              <input

                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
          </div>
        </div>

<!--        工作经验-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Work/Internship Experience</h5>
            <p class="text-primary" @click="handleWorkExperience" style="cursor: pointer">Add</p>
          </div>
          <div class="card my-2 p-3" v-for="(work,index) in resume.workExperiences" :key="index">
            <div class="row py-2 gx-5 gy-3 mt-3" >
              <h6 class="text-muted text-center">Work {{index + 1}}</h6>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Company Name</p>
                <input

                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Industry</p>
                <input

                  type="number"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Department</p>
                <input

                  type="number"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Role</p>
                <input

                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Start Date</p>
                <input

                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">End Date</p>
                <input

                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column justify-content-center">
                <p class="text-muted">Is Intern</p>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                </div>
              </div>
              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Working content</p>
                <textarea style="min-height: 150px" class="form-control" required/>
              </div>
              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Performance</p>
                <textarea style="min-height: 150px" class="form-control" required/>
              </div>
            </div>
          </div>
        </div>

<!--        项目经验-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Project Experience</h5>
            <p class="text-primary" @click="handleProjectExperience" style="cursor: pointer">Add</p>
          </div>
          <div class="card my-2 p-3" v-for="(project,index) in resume.projectExperiences" :key="index">
            <div class="row py-2 gx-5 gy-3 mt-3" >
              <h6 class="text-muted text-center">Project {{index + 1}}</h6>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Project Title</p>
                <input

                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Project Role</p>
                <input

                  type="number"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Project URL</p>
                <input

                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Start Date</p>
                <input

                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">End Date</p>
                <input

                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Project Description</p>
                <textarea style="min-height: 150px" class="form-control" required/>
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Project Performance</p>
                <textarea style="min-height: 150px" class="form-control" required/>
              </div>
            </div>
          </div>
        </div>

<!--        教育经历-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Education</h5>
            <p class="text-primary" @click="handleEducationAdd" style="cursor: pointer">Add</p>
          </div>
          <div class="card my-2 p-3" v-for="(education,index) in resume.educationExperiences" :key="index">
            <div class="row py-2 gx-5 gy-3 mt-3" >
              <h6 class="text-muted text-center">Education {{index + 1}}</h6>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">College</p>
                <input

                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Degree</p>
                <input

                  type="number"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Major</p>
                <input

                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Start Date</p>
                <input

                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">End Date</p>
                <input

                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Courses (Separate by ';')</p>
                <textarea style="min-height: 150px" class="form-control" required/>
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Experience in school</p>
                <textarea style="min-height: 150px" class="form-control" required/>
              </div>
            </div>
          </div>
        </div>

<!--        语言能力-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Language</h5>
            <p class="text-primary" @click="handleLanguageAdd" style="cursor: pointer">Add</p>
          </div>
          <div class="row py-2 gx-5 gy-3 mt-3" v-for="(job,index) in resume.languageExperience" :key="index">
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Language</p>
              <input

                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Proficiency</p>
              <input

                type="number"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Certificate</p>
              <input

                type="number"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Mark</p>
              <input

                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
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
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'


// 期望工作表单设置
const emptyDesiredJob = {
  title: '',
  company: '',
  salary: 0,
  location: '',
};

const emptyWorkExperience = {
  companyName: '',
  industry: '',
  department: '',
  role: '',
  content: '',
  performance: '',
  startDate: Date,
  endDate: Date,
  isIntern: false,
}

const emptyProjectExperience = {
  title: '',
  role: '',
  description: '',
  performance: '',
  url: '',
  startDate: Date,
  endDate: Date,
}

const emptyEducation = {
  college: '',
  degree: '',
  major: '',
  course: '',
  startDate: Date,
  endDate: Date,
}

const emptyLanguage = {
  language: '',
  proficiency: '',
  certificate: '',
  mark: '',
}



const resume = reactive({
  desiredJobs: [],
  workExperiences: [emptyWorkExperience],
  projectExperiences: [emptyProjectExperience],
  educationExperiences: [emptyEducation],
  languageExperience: [emptyLanguage]
});


function handleDesiredJobAdd(){
  if (resume.desiredJobs.length<3){
    resume.desiredJobs.push(emptyDesiredJob)
  }else{
    ElNotification({
      title: 'Error',
      message: 'Max Desired Job Added!',
      type: 'error',
    })
  }
}

// 工作经验表单设置
function handleWorkExperience(){
  if (resume.workExperiences.length<3){
    resume.workExperiences.push(emptyWorkExperience)
  }else{
    ElNotification({
      title: 'Error',
      message: 'Max Work Experience Added!',
      type: 'error',
    })
  }
}

// 项目经验表单设置
function handleProjectExperience(){
  if (resume.projectExperiences.length<3){
    resume.projectExperiences.push(emptyProjectExperience)
  }else{
    ElNotification({
      title: 'Error',
      message: 'Max Project Experience Added!',
      type: 'error',
    })
  }
}

// 教育表单设置
function handleEducationAdd(){
  if (resume.educationExperiences.length<2){
    resume.educationExperiences.push(emptyEducation)
  }else{
    ElNotification({
      title: 'Error',
      message: 'Max Education Experience Added!',
      type: 'error',
    })
  }
}

// 语言表单设置

function handleLanguageAdd(){
  if (resume.languageExperience.length<3){
    resume.languageExperience.push(emptyLanguage)
  }else{
    ElNotification({
      title: 'Error',
      message: 'Max Languages Added!',
      type: 'error',
    })
  }
}

function handleUpdate(){
  console.log(resume)
}


// 创建一个响应式副本
// let updatedCompany = reactive({} as Company);
const newAvatarPreview = ref(null)
const newAvatar = ref(null)

function onFileChange(event) {
  const file = event.target.files[0];
  newAvatar.value = file;
  if (file) {
    // 创建一个URL指向这个文件对象
    newAvatarPreview.value = URL.createObjectURL(file);
  } else {
    newAvatarPreview.value = null;
  }
}


</script>

<style scoped lang="css">

</style>
