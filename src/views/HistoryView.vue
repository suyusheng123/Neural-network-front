<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu />
      </el-header>
      <el-main style="margin-top: 0px">
        <h1 style="margin-top: 0px">历史记录</h1>
        <el-table :data="tableData" height="500px" style="width: 100%">
          <el-table-column prop="id" label="ID" width="200" />
          <el-table-column label="原来的图片" width="350px">
            <template #default="scope">
              <el-image :src="uploadIp + scope.row.originalAddress" fit="cover" style="height: 100px;width: 100px"
                :preview-src-list="[uploadIp + scope.row.originalAddress]" preview-teleported="true"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="识别结果" width="350px">
            <template #default="scope">
              <el-image :src="recIp + scope.row.newAddress" :preview-src-list="[recIp + scope.row.newAddress]"
                fit="cover" preview-teleported="true" style="height: 100px;width: 100px"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="recognizeTime" label="处理时长" width="200" />
          <el-table-column prop="createTime" label="处理日期" />
        </el-table> 
        <el-pagination
              style="margin-top: 10px"
              :page-sizes="[5, 10, 15, 20]"
              :page-size=pageInfo.pageSize
              layout="->,total, sizes,->, prev, pager, next, jumper"
              :total=pageInfo.totals
              :pager-count="11"
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
import { ElMessage } from 'element-plus';
let pageInfo = reactive({
  pageNum: 1,
  pageSize: 5,
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
    if(response.status === 200 && response.data.code === 0){
    // 将records数组赋值给tableData  
    // tableData.value = response.data.data.records;
    tableData.value = response.data.data.records.map((item, index) => {
      item.id = index + 1;
      return item;
    });
    pageInfo.totals = response.data.data.total - 0
  }else{
     ElMessage({
        message: "获取数据失败",
        type: 'error',
        duration: 5 * 1000
    })
  }
  } catch (error) {
    ElMessage({
        message: "服务器错误",
        type: 'error',
        duration: 5 * 1000
    })  
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
</script>
<style scoped>
</style>