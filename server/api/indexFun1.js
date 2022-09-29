const fs= require('fs')
const path =require('path')
var request = require("request");

module.exports ={
    downService(req, res, next) {
        let { x, y, z, urls } = req.body
        const filePath = path.join(__dirname, '../tile/' + z)
        const zfile = fs.existsSync(filePath)
        if (!zfile) {
            fs.mkdirSync(filePath)
        }
        const filePath2 = path.join(__dirname, '../tile/' + z + '/' + x)
        const xfile = fs.existsSync(filePath2)
        if (!xfile) {
            fs.mkdirSync(filePath2)
        }
        let stream = fs.createWriteStream(path.join(filePath2, y + '.png'))
        request(urls).pipe(stream).on('close', err => {
            console.log('下载完毕',y + '.png')
            res.send({status:200,message:'下载完毕'})
        })
    },
    downService1(req,res,next){
        let {x,y,z,urls} = req.body
        const filePath = path.join(__dirname,'../tile/'+z)
        fs.exists(filePath,rs=>{
            if(!rs){
                fs.mkdir(filePath,err=>{
                    const filePath2 = path.join(__dirname,'../tile/'+z+'/'+x)
                    fs.exists(filePath2,rs=>{
                        if(!rs){
                            fs.mkdir(filePath2,err=>{
                               let stream = fs.createWriteStream(path.join(filePath2,y+'.png'))
                               request(urls).pipe(stream).on('close', err =>{
                                  console.log('下载完毕')
                               })
                            })
                        }else{
                            let stream = fs.createWriteStream(path.join(filePath2,y+'.png'))
                            request(urls).pipe(stream).on('close', err =>{
                                console.log('下载完毕')
                            })
                        }
                    })
                })
            }else{
                const filePath2 = path.join(__dirname,'../tile/'+z+'/'+x)
                fs.exists(filePath2,rs=>{
                        if(!rs){
                            fs.mkdir(filePath2,err=>{
                               let stream = fs.createWriteStream(path.join(filePath2,y+'.png'))
                               console.log(stream,'stream')
                               request(urls).pipe(stream).on('close', err =>{
                                  console.log('下载完毕')
                               })
                            })
                        }else{
                            let stream = fs.createWriteStream(path.join(filePath2,y+'.png'))
                            console.log(stream,'stream')
                            request(urls).pipe(stream).on('close', err =>{
                                console.log('下载完毕')
                            })
                        }
                })
            }
        })
    }
}