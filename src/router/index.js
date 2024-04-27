import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FirstTest from '../views/FirstTest.vue'
import HomePage from '../views/HomePage.vue'
import LoginView from '../views/LoginView.vue'
import SignView from '../views/SignView.vue'

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
    //首页
    path: '/2',
    name: 'HomePage',
    component: HomePage
  },

  {
    //登录
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },

  {
    //注册
    path: '/sign',
    name: 'SignView',
    component: SignView
  },

  {
    //历史记录
    path: '/history',
    name: 'HistoryView',
    component: () => import('../views/HistoryView.vue')
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
