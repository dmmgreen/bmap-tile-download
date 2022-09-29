const express = require('express')
const app = express()
const routerApi = require('./router');

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
// 后端api路由
app.use('/service', routerApi);
// 监听端口
app.listen(3000,function(err){
    if(err){
      console.log(err,'err')
    }else{
      console.log('===> success listen at port:3000......');
    }
});