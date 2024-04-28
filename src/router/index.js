import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FirstTest from '../views/FirstTest.vue'
import HomePage from '../views/HomePage.vue'
import LoginView from '../views/LoginView.vue'
import SignView from '../views/SignView.vue'

const routes = [
  {
    path: '/2',
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
    path: '/',
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

  {
    //识别
    path: '/recognize',
    name: 'RecognizeView',
    component: () => import('../views/RecognizeView.vue')
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
