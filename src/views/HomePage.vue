<template>
    <div class="common-layout">
        <el-container>
            <el-header>
              <HeaderMenu />
            </el-header>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>  
<script>  
import HeaderMenu from '../components/HeaderMenu.vue'
export default {   
  data() {  
    return {  
      // 这里是你的数据  
    }  
  },  
  components: {
    HeaderMenu
  },  
}  
</script> 
  <!-- <script lang="ts" setup>  
  import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string,keyPath: string[]) => {
  console.log(key, keyPath)
}
  </script>   -->
    
<style scoped>  /* 这里是你的样式 */
</style>