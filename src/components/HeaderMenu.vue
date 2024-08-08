<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item>
      <img style="width: 70px" src="../assets/MyLogo.jpg" alt="logo" />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/recognize">加密识别</el-menu-item>
    <el-menu-item index="/history">历史记录</el-menu-item>
    <el-sub-menu index="/login" @click="ToLogin">
      <template #title>登录</template>
      <el-menu-item index="4-1" @click="logout">退出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router' // 导入 useRouter 钩子 
import axios from 'axios'; 
const router = useRouter() // 创建路由实例
const activeIndex = ref('1')
const handleSelect = (index) => {
  activeIndex.value = index;
  router.push(index);
};
onMounted(() => {
  // 设置 activeIndex 为当前路由,避免重新渲染造成活动状态重置
  activeIndex.value = router.currentRoute.value.path;
});
const logout = async () => {  
  try {  
    const url = '/user/logout'  
    await axios.post(url) // 如果服务器不需要数据，可以保持为空  
  
    // 清除用户的登录状态（例如，从 localStorage 中移除 token）  
    localStorage.removeItem('userToken')  
  
    // 导航到登录页面  
    router.push('/login')  
  } catch (error) {  
    console.error('Logout failed:', error)  
    // 在这里可以处理错误，比如显示一个通知给用户  
  }  
}  
  
const ToLogin = () => {
  activeIndex.value = '4';
  router.push({ path: '/login' });
}

</script>
