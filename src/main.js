import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
import locale from "element-plus/es/locale/lang/zh-cn";

createApp(App).use(router).use(ElementPlus,{locale}).mount('#app')
