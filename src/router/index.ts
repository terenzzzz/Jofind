import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LogIn from '@/views/LogIn.vue'
import SignUp from '@/views/SignUp.vue'
import ResumeView from '@/views/profile/ResumeView.vue'
import Profile from '@/views/profile/ProfileView.vue'
import OverallView from '@/views/profile/OverallView.vue'
import MessageView from '@/views/profile/MessageView.vue'
import JobView from '@/views/JobView.vue'
import DashboardView from '@/views/company/DashboardView.vue'
import CompanyView from '@/views/company/CompanyView.vue'
import PostedJobView from '@/views/company/PostedJobView.vue'
import ApplicationView from '@/views/company/ApplicationView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/job',
      name: 'job',
      component: JobView
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      redirect: '/profile/overall',
      children: [
        {
          path: 'overall',
          name: 'overall',
          component: OverallView,
        },
        {
          path: 'resume',
          name: 'resume',
          component: ResumeView,
        },
        {
          path: 'message',
          name: 'message',
          component: MessageView,
        }
      ]
    },

    // Company router
    {
      path: '/dashboard',
      name: '/dashboard',
      component: DashboardView,
      redirect: '/dashboard/company',
      children:[
        {
          path: 'company',
          name: 'company',
          component: CompanyView,
        },
        {
          path: 'postedjob',
          name: 'postedjob',
          component: PostedJobView,
        },
        {
          path: 'application',
          name: 'application',
          component: ApplicationView,
        },
        {
          path: 'message',
          name: 'message',
          component: MessageView,
        },
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果 savedPosition 存在，则滚动到该位置（通常用于后退/前进按钮）
    if (savedPosition) {
      return savedPosition;
    } else {
      // 否则，滚动到页面顶部
      return { top: 0 };
    }
  }
})
export default router
