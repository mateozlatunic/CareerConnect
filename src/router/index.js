import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../views/Homepage.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import profile from '../views/Profile.vue'
import job from '../views/Job.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homepage
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/register',
    name: 'Register',
    component: register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: profile
  },
  {
    path: '/job',
    name: 'Job',
    component: job
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
