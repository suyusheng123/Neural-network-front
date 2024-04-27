<template>
    <div class="common-layout">
        <el-container>

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
                <el-menu-item index="0">
                    <img style="width: 100px" src="../assets/logo.png" alt="logo" />
                </el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">即刻识别</el-menu-item>
                <el-menu-item index="3" @click="ToHistory">历史记录</el-menu-item>
                <el-menu-item index="4" @click="ToLogin">登录</el-menu-item>
            </el-menu>

        </el-container>
    </div>
</template>  

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = () => {
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
    }  
  } 
</script>


<style>
.flex-grow {
  flex-grow: 1;
}
</style>