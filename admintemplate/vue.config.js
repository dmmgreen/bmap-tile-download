const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/service': {
        target: 'http://192.168.110.46:3000', // 你要跨域的网址  比如  'http://news.baidu.com',
        // secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 这个参数是用来回避跨站问题的，配置完之后发请求时会自动修改http header里面的host，但是不会修改别的
        pathRewrite: {
          '^/service': '/service'// 路径的替换规则
          // 前端api接口写：axios.get('/api/list/xxx') ， 被处理之后实际访问的是：http://news.baidu.com/api/list/xxx

        }
      }
    }
  }
})
