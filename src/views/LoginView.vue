<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu />
      </el-header>
      <el-main>
        <div class="Login">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
            label-position="left">
            <h2>登录</h2>
            <div class="input-area">
              <el-input v-model="phone" style="width: 600px" placeholder="请输入手机号" type="text"
                class="input-full-width" />
              <el-input v-model="password" style="width: 600px" placeholder="请输入密码" type="password" show-password
                class="input-full-width" />
            </div>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="ToSign">前往注册</el-button>
          </el-form>
        </div>
      </el-main>
      <el-footer>
        <FooterComponent />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import HeaderMenu from '../components/HeaderMenu.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const phone = ref('')
const password = ref('')


const login = async () => {
  try {
    // 定义登录API的URL  
    const url = '/user/login';

    // 发送POST请求，包含登录信息  
    const response = await axios.post(url, {
      phone: phone.value, // 使用响应式引用的值  
      password: password.value // 使用响应式引用的值 
    });
    // 检查响应状态码  
    if (response.data.code === 0) {
      ElMessage({
        message: "登录成功",
        type: 'success',
        duration: 5 * 1000
      })
    } else {
      // // 处理非200状态码的情况  
      // throw new Error('登录失败，服务器返回非200状态码');
      ElMessage({
        message: "登录失败",
        type: 'error',
        duration: 5 * 1000
      })
    }
  } catch (error) {
    // 请求失败或登录失败，显示错误信息  
    console.error('登录请求失败：', error);
    alert('登录失败，请检查您的账号、密码或验证码是否正确，或稍后再试。');
    // 可以在这里抛出错误，让调用者处理  
    throw error;
  }
};  
</script>

<script>
export default {
  methods: {
    ToSign() {
      // 使用 Vue Router 的 push 方法进行页面跳转  
      this.$router.push({ path: '/sign' });
    }
  }
} 
</script>


<style scoped>
.input-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  height: 100%;
  /* 设置父元素的高度为100%，确保有足够的空间来居中 */
}

.input-area .el-input {
  margin-bottom: 20px;
  /* 给每个输入框之间添加一些间距 */
}
</style>