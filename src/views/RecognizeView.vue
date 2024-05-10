<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu />
      </el-header>
      <el-main>
        <div style="margin-top:-25px">
          <h1>yolo模型</h1>
          <h2>在保证识别准确度的前提下，可以有效防御对抗样本的攻击，识别并还原出原本的图片内容</h2>
        </div>
        <el-upload :before-upload="uploadImage" :on-success="handleSuccess" action="#" class="upload-demo"
          v-model:file-list="fileList" show-file-list="true" drag multiple>
          <el-icon class="el-icon--upload">
            <img style="width: 80%;object-fit: cover;"
              src="https://tse4-mm.cn.bing.net/th/id/OIP-C.X-5ho42VHJwTZg1ixPxo4wAAAA?w=211&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
              alt="">
          </el-icon>
          <div class="el-upload__text">
            拖拽文件到此处，或者
            <em>点击上传</em>
            <p style="font-size: 13px">支持剪切板粘贴</p>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              只能上传图片,图片大小不能超过500KB,禁止上传文件
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
const urlPath = ref(null)
const isShow = ref(false)
const fileList = ref([]) // 用于存储文件列表的响应式引用
let oldfile = ref({});
let flag = false;
// 封装上传的文件对象
const fileType = ref({
  image: '',
  confThreshold: '0.35',
  nmsThreshold: '0.23',
})
let loading = null;
//上传图片
function uploadImage(file) {
  oldfile.value = file
  console.log(file)
  try {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      throw new Error("只可以上传图片");
    }
    if (file.size >= 500 * 1024) {
      throw new Error("文件太大,无法上传")
    }
    if ((fileList.value.length >= 1) && (fileList.value[fileList.value.length - 1].isRecognize === 0)) {

      console.log(fileList.value)
      throw new Error("请将上传的图片" + fileList.value[fileList.value.length - 1].name + "解析,再上传新的图片")
    } else {
      putImg(file);
      if (flag) {
        console.log(file.name)
        fileList.value.push({
          "name": file.name,
          "isRecognize": 0
        })
      }
      console.log(fileList.value)
    }
    return false
  } catch (error) {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return false
  }
}


//监听剪切板函数
function handlePaste(event) {
  const items = (event.clipboardData || window.clipboardData).items;
  let file = null;

  if (!items || items.length === 0) {
    ElMessage({
      message: '当前浏览器不支持本地',
      type: 'error',
      duration: 5 * 1000
    })
    return;
  }
  // 搜索剪切板items
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf("image") !== -1) {
      file = items[i].getAsFile();
      console.log(file)
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
  try {
    if ((fileList.value.length >= 1) && (fileList.value[fileList.value.length - 1].isRecognize === 0)) {
      console.log(fileList.value)
      throw new Error("请先解析" + fileList.value[fileList.value.length - 1].name + "图片")
    } else {
      if (putImg(file))
        fileList.value.push({
          "name": file.name,
          "isRecognize": 0
        })
    }
    console.log(fileList.value)
  } catch (error) {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return false
  }
}

const putImg = async (file) => {
  try {
    let formData = new FormData();
    formData.append('file', file);
    // imgBase64.value=base64Str;
    loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    // 定义的URL  
    const url = '/common/upload';
    // 发送POST请求 
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    // 检查响应状态码  
    if (response.status === 200 && response.data.code === 0) {
      ElMessage({
        message: "上传成功",
        type: 'success',
        duration: 5 * 1000
      })
      fileType.value.image = response.data.data.file;
      //成功响应
      loading.close()
      flag = true;
    } else {
      ElMessage({
        message: "上传失败",
        type: 'error',
        duration: 5 * 1000
      })
      loading.close()
    }
  } catch (error) {
    ElMessage({
      message: "服务器错误",
      type: 'error',
      duration: 5 * 1000
    })
    loading.close()
  }
}
document.addEventListener('paste', handlePaste)
const Recognition = async () => {
  try {// 定义的URL  
    const url = '/image/recognize';
     loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    // 发送POST请求 
    const response = await axios.post(url, {
      image: fileType.value.image, // 使用上传后的文件路径   ,
      confThreshold: fileType.value.confThreshold,
      nmsThreshold: fileType.value.nmsThreshold
    });
    // 检查响应状态码  
    if (response.status === 200 && response.data.code === 0) {
      ElMessage({
        message: "识别成功",
        type: 'success',
        duration: 5 * 1000
      })
      // 处理成功的响应
      console.log('识别成功', response.data);
      isShow.value = true;
      urlPath.value = "/image/recognize/" + response.data.data.newAddress;
      srcList[0] = "http://localhost:8081" + urlPath.value;
      fileList.value[fileList.value.length - 1].isRecognize = 1;
      loading.close()
    } else {
      loading.close()
      throw new Error('识别失败');
    }
  } catch (error) {
    ElMessage({
      message: "服务器错误",
      type: 'error',
      duration: 5 * 1000
    })
    loading.close()
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

.el-upload-dragger {
  margin-top: 25px;
}

.el-upload__tip {
  color: #f00;
  font-size: 16px;
  margin-top: 7px;
}
</style>