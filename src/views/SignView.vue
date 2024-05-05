<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <HeaderMenu />
        </el-header>
        <el-main>
          <div class="Sign">
            <el-form ref="Sign" :model="SignForm" :rules="SignRules" class="Sign-form" autocomplete="on" label-position="left">
            <h2>注册</h2>
            <div class="input-area">
              <el-input v-model="phone" style="width: 600px" placeholder="请输入手机号" type="text" class="input-full-width" />
              <el-input v-model="password" style="width: 600px" placeholder="请输入密码"  type="password" show-password class="input-full-width" />
              <el-input v-model="confirmPassword" style="width: 600px" placeholder="请再次输入密码"  type="password" show-password class="input-full-width" />
            </div>
            <el-button type="primary"  @click="sign">注册</el-button>
            <el-button type="primary"  @click="ToLogin">返回登录</el-button>
          </el-form>
          </div>
        </el-main>
        <el-footer><FooterComponent /></el-footer>
      </el-container>
    </div>
  </template>  
  
  <script setup>
  import HeaderMenu from '../components/HeaderMenu.vue'
  import FooterComponent from '../components/FooterComponent.vue'
  import { ref } from 'vue'
  import axios from 'axios';
  const phone = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  const sign = async () => {
    alert("124")
    try {  
     // 定义登录API的URL  
     const url = '/user/register';  
    
    // 发送POST请求，包含登录信息  
    const response = await axios.post(url, {  
      phone: phone.value,  
      password: password.value, 
      confirmPassword:confirmPassword.value,
    });  
  
    // 检查响应状态码  
    if (response.status === 200) {  
      // 注册成功，处理成功逻辑  
      // 假设后端返回了一个包含token的响应体  
      const { token } = response.data;  
  
      // 保存token，例如到localStorage  
      localStorage.setItem('token', token);  
  
      // 通知调用者注册成功，或进行其他操作  
      console.log('注册成功');  
      return token; // 或者返回其他需要的数据  
    } else {  
      // 处理非200状态码的情况  
      throw new Error('注册失败,服务器返回非200状态码');  
    }  
  } catch (error) {  
    // 请求失败或登录失败，显示错误信息  
    console.error('注册请求失败：', error);  
    alert('注册失败，请检查您的账号、密码或验证码是否正确，或稍后再试。');  
    // 可以在这里抛出错误，让调用者处理  
    throw error;  
  }  
  };  
  </script> 
  
  <script>
  export default {  
    methods: {  
      ToLogin() {  
        // 使用 Vue Router 的 push 方法进行页面跳转  
        this.$router.push({ path: '/login' });  
      }  
    }  
  } 
  </script>
  
    
  <style scoped>
  .input-area {  
    display: flex;  
    flex-direction: column;  
    align-items: center; /* 垂直居中 */  
    justify-content: center; /* 水平居中 */  
    height: 100%; /* 设置父元素的高度为100%，确保有足够的空间来居中 */
  }  
    
  .input-area .el-input {  
    margin-bottom: 20px; /* 给每个输入框之间添加一些间距 */  
  } 
  
  </style>