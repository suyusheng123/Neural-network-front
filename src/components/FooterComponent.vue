<template>  
    <footer class="footer">  
      <div class="footer-content">  
        <p>© 2024 信息安全人工智能.</p>  
        <p>HYIT 淮阴工学院 </p>  
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
    background-color: #f5f5f5;  
    padding: 10px;  
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