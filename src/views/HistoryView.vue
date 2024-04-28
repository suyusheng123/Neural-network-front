<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu />
      </el-header>
      <el-main>
        <h1>History</h1>
        <div class="ShouSuoYiLan">
          
        <div class="date-picker-container">
          <div class="demo-date-picker">
            <div class="block">
              <!-- <p>Component value：{{ value }}</p> -->
              <el-date-picker v-model="value" type="daterange" start-placeholder="Start date" end-placeholder="End date"
                :default-time="defaultTime" />
            </div>
          </div>
        </div>

        <div class="mt-4">
          <el-input v-model="input3" style="max-width: 600px" placeholder="Please input" class="input-with-select">
            <template #prepend>
              <el-select v-model="select" placeholder="Select" style="width: 115px">
                <el-option label="Restaurant" value="1" />
                <el-option label="Order No." value="2" />
                <el-option label="Tel" value="3" />
              </el-select>
            </template>
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </div>

        </div>
       
        <el-table :data="tableData" height="250" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
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
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input3 = ref('')
const select = ref('')


const value = ref('')
const defaultTime = ref < [Date, Date] > ([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
])

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

</script> 
    
<style scoped>  
.ShouSuoYiLan {  
  display: flex; /* 使用Flexbox布局 */  
  align-items: center; /* 垂直居中子元素 */  
  /* justify-content: space-between; /* 移除这个，如果你想让元素都靠左 */  
}  
  
.mt-4 {  
  flex: 1; /* 允许元素在容器中伸缩 */  
  margin-right: 10px; /* 添加右边距以分隔元素 */  
}  
  
.date-picker-container {  
  flex: 2; /* 允许元素在容器中伸缩 */  
  margin-left: -450px; /* 负外边距使时间选择器左移 */  
}  
  
.demo-date-picker {  
  /* 保留原有的Flexbox样式 */  
  display: flex;  
  width: 100%;  
  padding: 0;  
  flex-wrap: wrap;  
}  
  
.demo-date-picker .block {  
  /* 保留原有的样式 */  
  padding: 20px 0;  
  text-align: center;  
  border-right: solid 1px var(--el-border-color);  
  flex: 1;  
}  
  
.demo-date-picker .block:last-child {  
  border-right: none;  
}  
  
.input-with-select .el-input-group__prepend {  
  background-color: var(--el-fill-color-blank);  
}  
</style>
