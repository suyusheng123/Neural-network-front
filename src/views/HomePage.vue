<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu />
      </el-header>
      <el-main>
        <div class="block text-center carousel-container"> <!-- 添加 carousel-container 类 -->
          <el-carousel height="300px" class="narrow-carousel"> <!-- 添加 narrow-carousel 类 -->
            <el-carousel-item v-for="(item, index) in carouselData" :key="index">
              <img :src="item.url" alt="Carousel Image" class="carousel-image" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <br>
        <div>
    <h1>基于同态加密的联邦学习图像识别系统</h1>
  </div>
  <div class='typora-export-content'>
      <h2 id='系统介绍'><span style="font-weight: bolder;">系统介绍</span></h2>
      <p>
        在信息时代的今天，图像识别技术已经成为了数字化应用中的重要组成部分。随着深度学习算法的发展和计算机性能的提升，图像识别技术取得了长足的进步。
      </p>
      <p>
        在本项目中，我们采用了<span style="font-weight: bold;">基于YOLOv8模型的检测算法</span>，结合了<span style="font-weight: bold;">同态加密和联邦学习等</span>信息安全技术，构建了一个强大的图像识别软件。该软件具有用户友好的登录界面，通过上传图片或拖拽图片文件即可实现图像识别功能。用户上传图片后，系统将自动识别图像中的目标，并在页面上显示识别结果。此外，该软件还支持历史记录功能，方便用户查看之前的识别记录，为用户提供更加便捷的体验。
      </p>
      <p>
        本项目的意义在于，它不仅为用户提供了高效、准确的图像识别服务，同时也保障了用户的信息安全。通过采用<span style="font-weight: bold;">同态加密和联邦学习等</span>信息安全技术，我们可以在保护用户隐私的前提下，实现对图像数据的有效处理和分析。此外，该软件的应用还能够解决现实生活中诸如安全监控、智能交通、医疗诊断等领域的重要问题，为社会发展提供了新的可能性。
      </p>
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
import { ref } from 'vue';

const carouselData = ref([
  { url: require("../assets/image1.png") },
  { url: require("../assets/YOLO.jpg") },
  { url: require("../assets/HYIT.jpg") },
  { url: require("../assets/学校.jpg") },
]);  
</script>





<style scoped>
.carousel-container {
  /* 新增样式类，用于限制轮播图的宽度 */
  width: 90%;
  /* 示例值，您可以根据需要调整 */
  margin: 0 auto;
  /* 水平居中 */
}

.narrow-carousel {
  /* 新增样式类，用于确保 el-carousel 继承宽度 */
  width: 100%;
  /* 继承父容器的宽度 */
}


.carousel-image {
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  /* 保持图片的纵横比 */
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
