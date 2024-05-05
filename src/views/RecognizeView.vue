<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu />
      </el-header>
      <el-main>
        <div>
          <h1>yolo模型</h1>
          <h2>在保证识别准确度的前提下，可以有效防御对抗样本的攻击，识别并还原出原本的图片内容</h2>
        </div>
        <el-upload ref="upload" action="http://localhost:8081/common/upload" :on-success="handleFileUpload" v-model:file-list="fileList"
          class="upload-demo" multiple :on-preview="handlePreview" :on-remove="handleRemove" 
          :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed">
          <el-button type="primary">上传文件</el-button>
          <!-- <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500KB.
            </div>
          </template> -->
        </el-upload>
        <el-button type="success" @click="Recognition">开始识别</el-button>

            <div class="demo-image__preview" v-if="isShow">
              <el-image style="width: 500px; height: 500px" :src="urlPath" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                :preview-src-list="srcList" :initial-index="4" fit="cover" />
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
import axios from 'axios'; // 确保已经安装了axios  
const uploadedImagePath = ref();
const isShow = ref(false)
const fileList = ref([]); // 用于存储文件列表的响应式引用  
const fileType = ref({
 image: '',
 confThreshold: '',
 nmsThreshold: '',
})
const handleFileUpload = (res) => {
  fileType.value.image = res.data.file
  fileType.value.confThreshold = 0.35
  fileType.value.nmsThreshold = 0.55

  uploadedImagePath.value = res.data.file
  uploadedImagePath.value = "file:" + uploadedImagePath.value
  // console.log('handleFileUpload called');
  // // 如果只允许选择一个文件，你可以直接使用 file 而不是 fileList  
  // // 这里我们假设允许多文件上传，并处理 fileList  

  // const formData = new FormData();

  // // 遍历所有选择的文件  
  // fileList.forEach((item) => {
  //   formData.append('file', item.raw); // 'files' 是后端期望的字段名，item.raw 是原始文件对象  
  // });


  // axios.post('/common/upload', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data' // 设置正确的Content-Type 
  //   },
  // })
  //   .then(response => {
  //     // 假设服务器返回的响应中包含了文件的路径
  //    fileList.value = response.data.file; // 更新fileList
  //    uploadedImagePath.value = response.data.file
  //     // 处理成功响应  
  //     console.log(fileList);
  //   })
  //   .catch(error => {
  //     // 处理错误  
  //     console.error(error);
  //   });

  // 注意：你可能需要清除fileList或更新它，以便用户可以看到上传的状态或进行其他操作  
};

const Recognition = async () => {

   // 获取上传后的文件路径
  //  const uploadedImagePath = fileList.value.map(file => file.response.path);

  // 定义的URL  
  const url = '/image/recognize';
  // 发送POST请求 
  console.log(uploadedImagePath)
  const response = await axios.post(url, {
    image: fileType.value.image, // 使用上传后的文件路径   ,
    confThreshold: fileType.value.confThreshold,
    nmsThreshold: fileType.value.nmsThreshold
  });
   // 检查响应状态码  
   if (response.status === 200) {
    // 处理成功的响应
    console.log('识别成功', response.data);
    isShow.value = true;
    urlPath.value = "D:/hz.jpg"
    // 这里可以添加更多的处理逻辑
  } else {
    // 处理非200状态码的情况  
    throw new Error('识别失败，服务器返回非200状态码');
  }
}

const urlPath = ref(null)
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
]

</script>


<style scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>