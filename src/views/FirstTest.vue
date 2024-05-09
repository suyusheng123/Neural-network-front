<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu />
      </el-header>
      <el-main>
        <h1>History</h1>
        <el-table :data="tableData" height="455" style="width: 100%">
          <el-table-column prop="id" label="ID" width="180" />
          <el-table-column label="图片" width="150px">
                    <template #default="scope">
                        <el-image :src="scope.row.imgUrl"></el-image>
                    </template>
                </el-table-column>
          <el-table-column prop="originalAddress" label="原来的地址" width="300" />
          <el-table-column prop="newAddress" label="新的地址" width="300" />
          <el-table-column prop="recognizeTime" label="处理时长" width="180" />
          <el-table-column prop="createTime" label="处理日期" />
        </el-table>
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
// import axios from 'axios'; // 引入 axios    
// 初始化表格数据为一个空数组  
const tableData = ref([
  {
    imgUrl: "https://ts2.cn.mm.bing.net/th?id=OIP-C.SQmqQt18WUcWYyuX8fGGGAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
  }
]);  
  
// 定义一个方法来发送 GET 请求并更新表格数据  
// async function fetchImageData() {  
//   try {  
//     const response = await axios.get('/image/page', {  
//       params: {  
//         page: 1,  
//         pageSize: 10  
//       }  
//     });  
      
//     // 假设服务器返回的数据结构是 { "data": { "records": [...] } }  
//     // 将records数组赋值给tableData  
//     tableData.value = response.data.data.records;  
//   } catch (error) {  
//     console.error('Error fetching image data:', error);  
//     // 这里可以添加错误处理逻辑，比如显示错误信息给用户  
//   }  
// }  
  
// 在组件加载时自动发送请求  
// fetchImageData(); // 调用函数来初始化表格数据  
</script>  
<style scoped>
</style>