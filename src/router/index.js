import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginView from '../views/LoginView.vue'
import SignView from '../views/SignView.vue'

const routes = [

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
