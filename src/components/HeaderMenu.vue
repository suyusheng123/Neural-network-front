<template>
    <div class="common-layout">
        <el-container>

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
                <el-menu-item index="0">
                    <img style="width: 100px" src="../assets/logo.png" alt="logo" />
                </el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="1" @click="ToHome">首页</el-menu-item>
                <el-menu-item index="2" @click="ToRecognize">即刻识别</el-menu-item>
                <el-menu-item index="3" @click="ToHistory">历史记录</el-menu-item>
                <el-menu-item index="4" @click="ToLogin" v-if="loginView">登录</el-menu-item>
                <el-menu-item index="4" @click="toggleLoginStatus" v-else>{{ isLoggedIn ? '已登录' : '请登录' }}  </el-menu-item>
            </el-menu>
        </el-container>
    </div>
</template>  

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = () => {
}
const isLoggedIn = ref(false) // 假设用户一开始未登录  
const loginView = ref(true)
const toggleLoginStatus = () => {  
  // 切换登录状态  
  isLoggedIn.value = !isLoggedIn.value;  
  // 如果已登录，你可能需要发送请求到服务器验证登录状态，并根据结果更新 isLoggedIn  
}  

</script>

<script>
export default {  
    methods: {  
      ToLogin() {  
        // 使用 Vue Router 的 push 方法进行页面跳转  
        this.$router.push({ path: '/login' });  
      },
      
      ToHistory() {  
        // 使用 Vue Router 的 push 方法进行页面跳转  
        this.$router.push({ path: '/history' });  
      },
      ToHome() {  
        // 使用 Vue Router 的 push 方法进行页面跳转  
        this.$router.push({ path: '/' });  
      },
      ToRecognize() {  
        // 使用 Vue Router 的 push 方法进行页面跳转  
        this.$router.push({ path: '/recognize' });  
      },
    }  
  } 
</script>




<style>
.flex-grow {
  flex-grow: 1;
}
</style>