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
        <!-- <el-upload ref="upload" action="http://localhost:8081/common/upload" :on-success="handleFileUpload" v-model:file-list="fileList"
          class="upload-demo" multiple :on-preview="handlePreview" :on-remove="handleRemove" 
          :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed">
          <el-button type="primary">上传文件</el-button>
        </el-upload> -->
        <el-upload :before-upload="uploadImage" action= "#" class="upload-demo"  drag multiple>
      <el-icon class="el-icon--upload">
        <img style="width: 80%;object-fit: cover;"  src="https://tse4-mm.cn.bing.net/th/id/OIP-C.X-5ho42VHJwTZg1ixPxo4wAAAA?w=211&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="">
      </el-icon>
      <div class="el-upload__text">
        拖拽文件到此处，或者
        <em>点击上传</em>
        <p style="font-size: 13px">支持微信截图后在此处粘贴( Ctrl + v)</p>
      </div>
      <template #tip>
        <div class="el-upload__tip">
                   jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
        <el-button type="success" @click="Recognition">开始识别</el-button>

            <div class="demo-image__preview" v-if="isShow">
              <el-image style="width: auto; height: auto" :src="urlPath" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
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
import { ElLoading, ElMessage } from 'element-plus';
 //图片base64
//  let imgBase64 = ref('')  
const uploadedImagePath = ref();
const urlPath = ref(null)
const isShow = ref(false)
// const fileList = ref([]); // 用于存储文件列表的响应式引用

const fileType = ref({
 image: '',
 confThreshold: '0.35',
 nmsThreshold: '0.23',
})
 //上传图片
 function uploadImage(file) {
  console.log(file)
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        ElMessage({
          message: '只可以上传图片',
          type: 'warning',
        })
        return isImage
      }
      // convertToBase64(file, async (base64String) => {
      //   //发送请求
        putImg(file)
      // })
      return false
    }

     //转化图片为base64
     function convertToBase64(file, callback) {
      const reader = new FileReader()
      reader.onload = (event) => {
        callback(event.target.result)
      }
      reader.readAsDataURL(file)
    }

    //监听剪切板函数
    function handlePaste(event) {
      const items = (event.clipboardData || window.clipboardData).items;
      let file = null;
 
      if (!items || items.length === 0) {
        ElMessage({
          message: '当前浏览器不支持本地',
          type: 'error',
        })
        return;
      }       
    // 搜索剪切板items
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
      if (!file) {
        ElMessage({
          message: '粘贴内容非图片',
          type: 'warning',
        })
        return;
      }
      convertToBase64(file, (base64Str) => {
        alert(base64Str)
        putImg(base64Str)
      })
    }
    function putImg(base64Str) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
  // 定义的URL  
  const url = '/common/upload';
  // 发送POST请求 
  const response = axios.post(url, {
    file: base64Str, // 使用上传后的文件路径
  });
   // 检查响应状态码  
   if (response.data.code === 0) {
    ElMessage({
        message: "上传成功",
        type: 'success',
        duration: 5 * 1000
      })
       fileType.value.image = response.data.file;
       //成功响应
       loading.close()
  } else {
    ElMessage({
        message: "上传失败",
        type: 'error',
        duration: 5 * 1000
      })
      loading.close()
  }
}
document.addEventListener('paste', handlePaste) 
const Recognition = async () => {
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
    urlPath.value = "/image/recognize/" + response.data.data.newAddress;
    srcList[0] = "http://localhost:8081" + urlPath.value;
    // alert(urlPath.value)
    // 这里可以添加更多的处理逻辑
  } else {
    // 处理非200状态码的情况  
    throw new Error('识别失败，服务器返回非200状态码');
  }
}

// http://localhost:8081/image/recognize/地址

const srcList = [
  // 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  // alert( urlPath.value),
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