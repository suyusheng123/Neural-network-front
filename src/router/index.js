import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FirstTest from '../views/FirstTest.vue'
import HomePage from '../views/HomePage.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/1',
    name: 'FirstTest',
    component: FirstTest
  },

  {
    path: '/2',
    name: 'HomePage',
    component: HomePage
  },

  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },





  // {
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
