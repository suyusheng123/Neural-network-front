const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081, // 前端端口
    proxy: { // 代理
      '^/': {
      ws: false, // 在这里添加本代码
        target: 'http://localhost:8080',// 连接后端跨域配置跨域
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
})
