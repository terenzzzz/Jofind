
<template>
  <div class="container px-lg-5" style="margin-block: 100px">
    <div class="card shadow-lg">
      <div class="card-body p-0">
        <div class="row justify-content-center m-0">
          <div class="col-md-5 d-none d-md-flex flex-column justify-content-center align-items-center p-5 bg-light">
            <img src="../assets/logo.png" class="img-fluid" style="max-width: 150px">
            <p class="text-muted text-center">
              Explore thousands of job opportunities with all the information
              you need, and managing all your job applications from start to
              finish.
            </p>
          </div>
          <div class="col-md-7 justify-content-center h-100 align-items-center">
            <main class="w-100 d-flex justify-content-center align-items-center fw-bold">
              <form class="w-75" @submit.prevent="handleSubmit">
                <h1 class="text-start align-items-center justify-content-center fw-bold fw-bolder mt-5">
                  Sign up
                </h1>

                <!----------------------------------------- Registration field entries ----------------------------------------->

                <div class="btn-group w-100 mt-3" role="group" aria-label="Basic radio toggle button group">
                  <input
                    type="radio"
                    class="btn-check"
                    name="roleRadio"
                    :value="'0'"
                    v-model="selectedRole"
                    id="roleRadio1"
                  />
                  <label class="btn btn-outline-primary" for="roleRadio1">As a Job Seeker</label>

                  <input
                    type="radio"
                    class="btn-check"
                    name="roleRadio"
                    :value="'1'"
                    v-model="selectedRole"
                    id="roleRadio2"
                  />
                  <label class="btn btn-outline-primary" for="roleRadio2">As Company</label>
                </div>


                <div class="d-flex mt-5 align-items-center justify-content-center">
                  <div class="img-container border border-2 p-2" style="height: 100px; width: 100px">
                    <img :src="uploadImg" class="img-fluid" />
                  </div>
                  <div class="mb-3 ms-3">
                    <label for="formFileSm" class="form-label">Upload {{ selectedRole === '0'? 'Avatar Image' : 'Company Logo'}}</label>
                    <input class="form-control form-control-sm" id="formFileSm" type="file" @change="onFileChange">
                  </div>
                </div>


                <div class="row mb-4 pt-4 pb-2">
                  <div class="col-md-12 p-0 px-1">
                    <div class="row mb-2">
                      <div class="col-lg-12 px-1">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="inputName" required>
                          <label for="name">{{selectedRole === '0'? 'Name' : 'Company Name'}}</label>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-2">
                      <div class="col-lg-12 px-1">
                        <div class="form-floating">
                          <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" v-model="inputEmail"  required>
                          <label for="email">Email address</label>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-2">
                      <div class="col-md-12 px-1">
                        <div class="form-floating">
                          <input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="inputPassword" required>
                          <label for="password">Password</label>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-2">
                      <div class="col-md-12 px-1">
                        <div class="form-floating">
                          <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" v-model="inputConfirmPassword" required>
                          <label for="confirmPassword">Confirm Password</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <!------------------------------ Terms and Conditions Checkbox ---------------------------------->
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-check form-switch text-center m-1 d-flex justify-content-center mb-4">
                      <input class="form-check-input" type="checkbox" id="tcCheck" name="tcCheck" required v-model="isCheckTC">
                      <label class="form-check-label ms-3" for="tcCheck">
                        Agree to the <a href="#" class="hover-link text-decoration-none">Terms and Conditions</a>
                      </label>
                    </div>
                  </div>
                </div>

                <!-------------------------------- Captcha ---------------------------------->
                <div class="card-footer-sign my-2">
                  <button class="btn btn-primary w-100 py-2" type="submit">
                    Sign Up
                  </button>

                  <div class="text-center align-content-center fw-bolder my-5">
                    <p>Already have an account? <router-link to="/login" class="red-bottom">Log In</router-link></p>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


import { ref } from 'vue'

const selectedRole = ref("0")
const uploadImg = ref(null)
const inputName = ref("")
const inputEmail = ref("")
const inputPassword = ref("")
const inputConfirmPassword = ref("")
const isCheckTC = ref(false)


function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    // 创建一个URL指向这个文件对象
    uploadImg.value = URL.createObjectURL(file);
  } else {
    uploadImg.value = null;
  }
}

function handleSubmit() {
  console.log("Sign up")
}
</script>


<style scoped lang="css">

</style>
