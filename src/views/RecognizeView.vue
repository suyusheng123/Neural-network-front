<template>
    <div class="common-layout">
        <el-container>
            <el-header>
              <HeaderMenu />
            </el-header>
            <el-main>Main
                <p>RView</p>
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