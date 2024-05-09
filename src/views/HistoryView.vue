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
          <el-table-column label="原来的图片" width="150px">
            <template #default="scope">
              <el-image :src="uploadIp + scope.row.originalAddress" fit="cover"
                :preview-src-list="[uploadIp + scope.row.originalAddress]" preview-teleported="true"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="识别结果" width="150px">
            <template #default="scope">
              <el-image :src="recIp + scope.row.newAddress" :preview-src-list="[recIp + scope.row.newAddress]"
                fit="cover" preview-teleported="true"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="recognizeTime" label="处理时长" width="180" />
          <el-table-column prop="createTime" label="处理日期" />
        </el-table>
        <el-pagination
              :page-sizes="[2, 5, 10, 20]"
              :page-size=pageInfo.pageSize
              layout="total, sizes, prev, pager, next, jumper"
              :total=pageInfo.totals
              :current-page=pageInfo.pageNum
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
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
import {reactive, ref} from 'vue';
import axios from 'axios'; // 引入 axios  
let pageInfo = reactive({
  pageNum: 1,
  pageSize: 2,
  totals: Number
})
// 初始化表格数据为一个空数组  
const tableData = ref([]);
// 原始ip地址
const uploadIp = "http://localhost:8081/image/upload/";
const recIp = 'http://localhost:8081/image/recognize/';
// 预览图片地址

// 定义一个方法来发送 GET 请求并更新表格数据 
async function fetchImageData(pageNum, pageSize) {
  try {
    const response = await axios.get('/image/page', {
      params: {
        page: pageNum,
        pageSize: pageSize
      }
    });
    // 将records数组赋值给tableData  
    // tableData.value = response.data.data.records;
    tableData.value = response.data.data.records.map((item, index) => {
      item.id = index + 1;
      return item;
    });
    pageInfo.totals = response.data.data.total - 0
  } catch (error) {
    console.error('Error fetching image data:', error);
    // 这里可以添加错误处理逻辑，比如显示错误信息给用户  
  }
}
function handleSizeChange(pageSize){
      pageInfo.pageSize=pageSize;
      fetchImageData(pageInfo.pageNum, pageSize);
}
function handleCurrentChange(pageNum){
      pageInfo.pageNum=pageNum;
      fetchImageData(pageNum, pageInfo.pageSize);
}

fetchImageData(pageInfo.pageNum, pageInfo.pageSize);
// watch([()=>pageInfo.pageNum,()=>pageInfo.pageSize], (newValue) => {
//   //这里使用了skuSearchDto，不能使用watchEffect，否则在skuSearchDto变化的时候也会触发
//   Search()
// })

</script>
<style scoped></style>