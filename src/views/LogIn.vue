<template>
  <div class="container login px-lg-5" style="margin-block: 100px">
    <div class="card shadow-lg">
      <div class="card-body p-0">
        <div class="row justify-content-center m-0">
          <div
            class="col-md-5 d-none d-md-flex flex-column justify-content-center align-items-center p-5 bg-light"
          >
            <img
              src="../assets/logo.png"
              class="img-fluid"
              style="max-width: 150px"
            />
            <p class="text-muted text-center">
              Explore thousands of job opportunities with all the information
              you need, and managing all your job applications from start to
              finish.
            </p>
          </div>
          <div class="col-md-7 justify-content-center align-items-center h-100">
            <main
              class="w-100 m-auto p-2 d-flex justify-content-center align-items-center fw-bold rounded-3"
            >
              <form class="w-75 py-5" @submit.prevent="login">
                <h1
                  class="parent-text text-start align-items-center justify-content-center fw-bold fw-bolder pb-4 my-2"
                >
                  Log in
                </h1>

                <div class="pb-2 my-5">
                  <div class="form-floating my-1 mx-1 mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      v-model="email"
                      required
                    />
                    <label for="email">Email address</label>
                  </div>
                  <div class="form-floating my-1 mx-1">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      v-model="password"
                      required
                    />
                    <label for="password">Password</label>
                  </div>
                </div>

                <button
                  class="btn btn-primary w-100 py-2"
                  id="loginForm"
                  @click="loginHandler"
                >
                  Sign in
                </button>

                <div class="text-center align-content-center fw-bolder mt-5">
                  <a
                    href="/forgot-password"
                    class="hover-link text-decoration-none"
                    ><span class="red-bottom">Forgot password?</span></a
                  >
                </div>

                <div class="card-footer-login my-3">
                  <div class="text-center align-content-center fw-bolder mt-3">
                    <p>
                      Don't have an account?
                      <router-link
                        to="/signup"
                        class="nav-login mx-2 red-bottom"
                        >Register</router-link
                      >
                    </p>
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
import { login } from '@/api/user'
import {useUserStore} from '@/stores/User'
import {accountType} from '@/enums/accountType'
import { useRouter } from 'vue-router';

const userStore = useUserStore()

const password = ref()
const email = ref()

const router = useRouter()

async function loginHandler() {
  try {
    const response = await login({ email: email.value, password: password.value });
    if (response.data.status === 200) {

      let user = response.data.user
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('access_token', response.data.token);
      user.token = response.data.token

      userStore.$patch(user)
      user = userStore.getUser


      if (user.role === accountType.JobSeeker) {
        await router.push({ path: 'job' });
      }else if(user.role === accountType.Company){
        await router.push({ path: '/dashboard' });
      }
    } else {
      alert('Login failed: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}
</script>

<style scoped lang="css">
#login {
  height: 100vh;
}
</style>
