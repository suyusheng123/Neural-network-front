<template>  
    <footer class="footer">  
      <div class="footer-content">  
        <p>© 2024 第十七届全国大学生信息安全竞赛信息安全作品赛参赛作品 淮阴工学院 </p>  
        <!-- 可以添加更多项目信息 -->  
      </div>  
    </footer>  
  </template>  
    
  <script>  
  export default {  
    name: 'FooterComponent',  
    // 组件的其他选项（比如数据、方法等）可以在这里定义  
  };  
  </script>  
    
  <style scoped>  
  .footer {  
    height: auto;
    background-color: #f5f5f5;  
    padding: 5px;  
    text-align: center;  
    position: fixed;  
    left: 0;  
    bottom: 0;  
    width: 100%;  
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);  
  }  
    
  .footer-content {  
    color: #333;  
  }  
  </style>