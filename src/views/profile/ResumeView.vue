<template>
  <div id="seeker-profile" class="container h-100">
    <div v-if="hasResume" class="row mt-3 h-100">
      <div class="card p-5 border border-1 rounded-3 shadow" v-if="resume">
        <!--    个人基本信息-->
        <div class="d-flex justify-content-end" style="z-index: 999">
          <button
            class="btn btn-outline-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#updateResume"
          >
            Edit
          </button>
        </div>

        <resume-card :resume="resume" :is-card="false"></resume-card>
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
    <div v-else>
      <el-empty description="You are not setting your Resume yet">
        <!--      <el-button type="primary" >Add a Company</el-button>-->
        <el-button class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#updateResume" >Edit</el-button>
      </el-empty>
    </div>
  </div>

  <!--        添加模态框-->
  <div class="modal fade" id="updateResume" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <form class="modal-content card p-5" @submit.prevent="handleUpdate">
        <div class="d-flex justify-content-between">
          <p class="btn" data-bs-toggle="modal" data-bs-target="#updateResume" @click="fetchResume">
            <i class="bi bi-x-lg"></i>
          </p>
          <button class="btn btn-primary" type="submit" data-bs-toggle="modal" data-bs-target="#updateResume">Update</button>
        </div>
        <h5 class="text-center mt-5" >Updating Resume</h5>

        <div class="d-flex mt-5 align-items-center">
          <div
            class="img-container border border-2"
            style="height: 100px; width: 100px"
          >
            <img
              :src="newAvatarPreview ? newAvatarPreview : 'data:image/png;base64,' + resume.avatar"
              class="img-fluid object-fit-cover"
              style="height: 100px; width: 100px"
            />
          </div>
          <div class="mb-3 ms-3">
            <label for="formFileSm" class="form-label">Upload Your Photo</label>
            <input
              class="form-control form-control-sm"
              id="formFileSm"
              type="file"
              @change="onFileChange"
            />
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
              v-model="resume.name"
            />
          </div>

          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Date of Birth</p>
            <input
              v-model="resume.birth"
              type="date"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Email</p>
            <input
              v-model="resume.email"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Top Degree</p>
            <input
              v-model="resume.topDegree"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Phone</p>
            <input
              v-model="resume.phone"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-4 d-flex flex-column">
            <p class="text-muted">Living Location</p>
            <input
              v-model="resume.location"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
          </div>

          <div class="col-12 d-flex flex-column">
            <p class="text-muted">Self-evaluation</p>
            <textarea
              style="min-height: 150px"
              class="form-control"
              required
              v-model="resume.selfEvaluation"
            />
          </div>
        </div>

        <!--        期望工作-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Desired Position</h5>
            <p
              class="text-primary"
              @click="handleDesiredJobAdd"
              style="cursor: pointer"
            >
              Add
            </p>
          </div>
          <div
            class="row py-2 gx-5 gy-3 mt-3"
            v-for="(job, index) in resume.desiredJobs"
            :key="index"
          >
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Job Role</p>
              <input
                v-model="resume.desiredJobs[index].role"
                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-2 d-flex flex-column">
              <p class="text-muted">Salary From(K)</p>
              <input
                v-model="resume.desiredJobs[index].salaryFrom"
                type="number"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-2 d-flex flex-column">
              <p class="text-muted">Salary To(K)</p>
              <input
                v-model="resume.desiredJobs[index].salaryTo"
                type="number"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Location</p>
              <input
                v-model="resume.desiredJobs[index].location"
                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-1 d-flex flex-column justify-content-end">
              <div class="btn btn-outline-primary btn-sm" @click="deleteExperience('desiredJobs', index)">
                <i class="bi bi-trash3"></i>
              </div>
            </div>
          </div>
        </div>

        <!--        工作经验-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Work/Internship Experience</h5>
            <p
              class="text-primary"
              @click="handleWorkExperience"
              style="cursor: pointer"
            >
              Add
            </p>
          </div>
          <div
            class="card my-2 p-3"
            v-for="(work, index) in resume.workExperiences"
            :key="index"
          >
            <div class="row py-2 gx-5 gy-3">
              <div class="d-flex justify-content-end">
                <div class="btn btn-outline-primary btn-sm" @click="deleteExperience('workExperiences', index)">
                  <i class="bi bi-trash3"></i>
                </div>
              </div>
              <h6 class="text-muted text-center">Work {{ index + 1 }}</h6>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Company Name</p>
                <input
                  v-model="resume.workExperiences[index].companyName"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Industry</p>
                <input
                  v-model="resume.workExperiences[index].industry"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Department</p>
                <input
                  v-model="resume.workExperiences[index].department"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Role</p>
                <input
                  v-model="resume.workExperiences[index].role"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Start Date</p>
                <input
                  v-model="resume.workExperiences[index].startDate"
                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">End Date</p>
                <input
                  v-model="resume.workExperiences[index].endDate"
                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column justify-content-center">
                <p class="text-muted">Is Intern</p>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    v-model="resume.workExperiences[index].isIntern"
                  />
                </div>
              </div>
              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Working content</p>
                <textarea
                  style="min-height: 150px"
                  class="form-control"
                  required
                  v-model="resume.workExperiences[index].content"
                />
              </div>
              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Performance</p>
                <textarea
                  style="min-height: 150px"
                  class="form-control"
                  required
                  v-model="resume.workExperiences[index].performance"
                />
              </div>
            </div>
          </div>
        </div>

        <!--        项目经验-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Project Experience</h5>
            <p
              class="text-primary"
              @click="handleProjectExperience"
              style="cursor: pointer"
            >
              Add
            </p>
          </div>
          <div
            class="card my-2 p-3"
            v-for="(project, index) in resume.projectExperiences"
            :key="index"
          >
            <div class="row py-2 gx-5 gy-3">
              <div class="d-flex justify-content-end">
                <div class="btn btn-outline-primary btn-sm" @click="deleteExperience('projectExperiences', index)">
                  <i class="bi bi-trash3"></i>
                </div>
              </div>
              <h6 class="text-muted text-center">Project {{ index + 1 }}</h6>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Project Title</p>
                <input
                  v-model="resume.projectExperiences[index].title"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Project Role</p>
                <input
                  v-model="resume.projectExperiences[index].role"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Project URL</p>
                <input
                  v-model="resume.projectExperiences[index].url"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Start Date</p>
                <input
                  v-model="resume.projectExperiences[index].startDate"
                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">End Date</p>
                <input
                  v-model="resume.projectExperiences[index].endDate"
                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Project Description</p>
                <textarea
                  style="min-height: 150px"
                  class="form-control"
                  required
                  v-model="resume.projectExperiences[index].description"
                />
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Project Performance</p>
                <textarea
                  style="min-height: 150px"
                  class="form-control"
                  required
                  v-model="resume.projectExperiences[index].performance"
                />
              </div>
            </div>
          </div>
        </div>

        <!--        教育经历-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Education</h5>
            <p
              class="text-primary"
              @click="handleEducationAdd"
              style="cursor: pointer"
            >
              Add
            </p>
          </div>
          <div
            class="card my-2 p-3"
            v-for="(education, index) in resume.educationExperiences"
            :key="index"
          >
            <div class="row py-2 gx-5 gy-3">
              <div class="d-flex justify-content-end">
                <div class="btn btn-outline-primary btn-sm" @click="deleteExperience('educationExperiences', index)">
                  <i class="bi bi-trash3"></i>
                </div>
              </div>
              <h6 class="text-muted text-center">Education {{ index + 1 }}</h6>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">College</p>
                <input
                  v-model="resume.educationExperiences[index].college"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Degree</p>
                <input
                  v-model="resume.educationExperiences[index].degree"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Major</p>
                <input
                  v-model="resume.educationExperiences[index].major"
                  type="text"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">Start Date</p>
                <input
                  v-model="resume.educationExperiences[index].startDate"
                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-3 d-flex flex-column">
                <p class="text-muted">End Date</p>
                <input
                  v-model="resume.educationExperiences[index].endDate"
                  type="date"
                  class="form-control"
                  placeholder=""
                  required
                />
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Courses (Separate by ';')</p>
                <textarea
                  style="min-height: 150px"
                  class="form-control"
                  required
                  v-model="resume.educationExperiences[index].course"
                />
              </div>

              <div class="col-12 d-flex flex-column">
                <p class="text-muted">Experience in school</p>
                <textarea
                  style="min-height: 150px"
                  class="form-control"
                  required
                  v-model="resume.educationExperiences[index].schoolExperience"
                />
              </div>
            </div>
          </div>
        </div>

        <!--        语言能力-->
        <div class="row">
          <div class="d-flex justify-content-between mt-5">
            <h5>Language</h5>
            <p
              class="text-primary"
              @click="handleLanguageAdd"
              style="cursor: pointer"
            >
              Add
            </p>
          </div>
          <div
            class="row py-2 gx-5 gy-3"
            v-for="(job, index) in resume.languageExperience"
            :key="index"
          >
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Language</p>
              <input
                v-model="resume.languageExperience[index].language"
                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Proficiency</p>
              <input
                v-model="resume.languageExperience[index].proficiency"
                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-3 d-flex flex-column">
              <p class="text-muted">Certificate</p>
              <input
                v-model="resume.languageExperience[index].certificate"
                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-2 d-flex flex-column">
              <p class="text-muted">Mark</p>
              <input
                v-model="resume.languageExperience[index].mark"
                type="text"
                class="form-control"
                placeholder=""
                required
              />
            </div>
            <div class="col-1 d-flex flex-column justify-content-end">
              <div class="btn btn-outline-primary btn-sm" @click="deleteExperience('languageExperience', index)">
                <i class="bi bi-trash3"></i>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref  } from 'vue'
import { ElNotification } from 'element-plus'
import { getResume, updateResume } from '@/api/resume'
import ResumeCard from '@/components/resume/resumeCard.vue'


const resume = reactive({
  name: '',
  birth: '',
  email: '',
  topDegree: '',
  phone: '',
  location: '',
  selfEvaluation: '',
  avatar: '',
  desiredJobs: [],
  workExperiences: [],
  projectExperiences: [],
  educationExperiences: [],
  languageExperience: [],
})

function handleDesiredJobAdd() {
  if (resume.desiredJobs.length < 3) {
    resume.desiredJobs.push(emptyDesiredJob)
  } else {
    ElNotification({
      title: 'Error',
      message: 'Max Desired Job Added!',
      type: 'error',
    })
  }
}

// 工作经验表单设置
function handleWorkExperience() {
  if (resume.workExperiences.length < 3) {
    resume.workExperiences.push(emptyWorkExperience)
  } else {
    ElNotification({
      title: 'Error',
      message: 'Max Work Experience Added!',
      type: 'error',
    })
  }
}

// 项目经验表单设置
function handleProjectExperience() {
  if (resume.projectExperiences.length < 3) {
    resume.projectExperiences.push(emptyProjectExperience)
  } else {
    ElNotification({
      title: 'Error',
      message: 'Max Project Experience Added!',
      type: 'error',
    })
  }
}

// 教育表单设置
function handleEducationAdd() {
  if (resume.educationExperiences.length < 2) {
    resume.educationExperiences.push(emptyEducation)
  } else {
    ElNotification({
      title: 'Error',
      message: 'Max Education Experience Added!',
      type: 'error',
    })
  }
}

// 语言表单设置
function handleLanguageAdd() {
  if (resume.languageExperience.length < 3) {
    resume.languageExperience.push(emptyLanguage)
  } else {
    ElNotification({
      title: 'Error',
      message: 'Max Languages Added!',
      type: 'error',
    })
  }
}

// 创建头像预览
const newAvatarPreview = ref(null)
const newAvatar = ref(null)
function onFileChange(event) {
  const file = event.target.files[0]
  newAvatar.value = file
  if (file) {
    // 创建一个URL指向这个文件对象
    newAvatarPreview.value = URL.createObjectURL(file)
  } else {
    newAvatarPreview.value = null
  }
}

async function handleUpdate() {
  const formData = new FormData()

  // 将普通字段添加到 FormData
  formData.append('avatar', newAvatar.value)
  formData.append('name', resume.name)
  formData.append('birth', resume.birth)
  formData.append('email', resume.email)
  formData.append('topDegree', resume.topDegree)
  formData.append('phone', resume.phone)
  formData.append('location', resume.location)
  formData.append('selfEvaluation', resume.selfEvaluation)

  // 将数组（如 desiredJobs）转换成 JSON 字符串，或者按需要处理
  formData.append('desiredJobs', JSON.stringify(resume.desiredJobs))
  formData.append('workExperiences', JSON.stringify(resume.workExperiences))
  formData.append(
    'projectExperiences',
    JSON.stringify(resume.projectExperiences),
  )
  formData.append(
    'educationExperiences',
    JSON.stringify(resume.educationExperiences),
  )
  formData.append(
    'languageExperience',
    JSON.stringify(resume.languageExperience),
  )
  try {
    const response = await updateResume(formData)
    // console.log(response)
    if (response.data.status === 200) {
      ElNotification({
        title: 'Success',
        message: 'You Have Successfully Update Your Resume!',
        type: 'success',
      })
      // closeModal()
    } else {
      ElNotification({
        title: 'Error',
        message: 'Something went wrong!',
        type: 'error',
      })
    }
  } catch (error) {
    alert('An error occurred: ' + error.message)
    ElNotification({
      title: 'Error',
      message: 'Something went wrong!',
      type: 'error',
    })
  }
  await fetchResume()
}

const hasResume = ref(false)

async function fetchResume() {
  try {
    const response = await getResume()
    if (response.data.data){
      hasResume.value = true
      Object.assign(resume, response.data.data)
    }else{
      hasResume.value = false
    }

  } catch (error) {
    console.error('Failed to fetch Resume:', error)
  }
}

onMounted(async () => {
  // status.value = await getSeekingStatus()
  await fetchResume()
})

function closeModal() {
  const modalElement = document.getElementById('updateResume');
  const backdropElement = document.querySelector('.modal-backdrop');

  modalElement.classList.remove('show'); // 强制移除 show 类

  // 手动移除 backdrop 元素
  if (backdropElement) {
    backdropElement.remove();
  }
}

function deleteExperience(field, index) {
  // 确保传入的字段是有效的
  if (resume[field] && Array.isArray(resume[field])) {
    resume[field].splice(index, 1); // 删除指定索引的元素
  } else {
    console.error(`Field ${field} is not a valid array`);
  }
}

</script>

<style scoped lang="css"></style>
