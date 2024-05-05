<template>
  <!-- <div class="common-layout"> -->
  <!-- <el-container> -->
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#141414"
    text-color="#fff" active-text-color="#ffd04b" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="0">
      <img style="width: 100px" src="../assets/logo.png" alt="logo" />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="ToHome">首页</el-menu-item>
    <el-menu-item index="2" @click="ToRecognize">即刻识别</el-menu-item>
    <el-menu-item index="3" @click="ToHistory">历史记录</el-menu-item>
    <el-sub-menu index="4" @click="ToLogin">
      <template #title>登录</template>
      <el-menu-item index="4-1" @click="logout">退出</el-menu-item>
    </el-sub-menu>
  </el-menu>

  <!-- </el-container> -->
  <!-- </div> -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // 导入 useRouter 钩子 
import axios from 'axios'; 
const router = useRouter() // 创建路由实例
const activeIndex = ref('1')
const handleSelect = () => {
}
const logout =async ()=>{
  const url = '/user/logout';
  const response = await axios.post(url, {  

  });  
   // 检查响应状态码  
   if (response.status === 200) {  
    // 登录成功，处理成功逻辑  
    // 假设后端返回了一个包含token的响应体  
    const { token } = response.data;  

    // 保存token，例如到localStorage  
    localStorage.setItem('token', token);  

    // 通知调用者登录成功，或进行其他操作  
    console.log('登录成功');  
    return token; // 或者返回其他需要的数据  
  } else {  
    // 处理非200状态码的情况  
    throw new Error('登录失败，服务器返回非200状态码');  
  }  
}

const ToLogin = () => {
  activeIndex.value = '4';
  router.push({ path: '/login' });
}
const ToHistory = () => {
  activeIndex.value = '3';
  router.push({ path: '/history' });
}
const ToHome = () => {
  activeIndex.value = '1';
  router.push({ path: '/' });

}
const ToRecognize = () => {
  activeIndex.value = '2';
  router.push({ path: '/recognize' });
}
</script>
