const fs= require('fs')
const path =require('path')
const http = require('http')
const events = require('events');
const eventEmitter = new events.EventEmitter();
const TileLnglatTransform = require('tile-lnglat-transform'); //用于经纬度转换为瓦片坐标
const TileLnglatTransformBaidu = TileLnglatTransform.TileLnglatTransformBaidu;
let configDefault = require('../config');
let taskList = new Set(); //任务队列
let errLogPath = './err.log'; //错误日志
let errorTilesCount = {}; //失败次数记录

let totalCount = 0 //瓦片总数
let downCount = 0; //已下载总数
let downSize = 0; //已下载大小
let taskCount = 0; //已添加任务数量
let errorCount = 0; //出错总数
let config = configDefault

let tileZ = config.minLevel //瓦片级别
let p1 = TileLnglatTransformBaidu.lnglatToTile(config.x1, config.y1, tileZ); //左上角
let p2 = TileLnglatTransformBaidu.lnglatToTile(config.x2, config.y2, tileZ); //右下角
let tileX = p1.tileX; //瓦片X
let tileY = p2.tileY - 1; //瓦片Y


module.exports ={
    init(){
        totalCount = 0 //瓦片总数
        downCount = 0; //已下载总数
        taskCount = 0; //已添加任务数量
        errorCount = 0; //出错总数
        tileZ = config.minLevel //瓦片级别
        p1 = TileLnglatTransformBaidu.lnglatToTile(config.x1, config.y1, tileZ); //左上角
        p2 = TileLnglatTransformBaidu.lnglatToTile(config.x2, config.y2, tileZ); //右下角
        tileX = p1.tileX; //瓦片X
        tileY = p2.tileY - 1; //瓦片Y
    },
    /**
     * 计算瓦片数量
     */
    calcTileCount(){
        let count = 0
        for(var i=config.minLevel;i<=config.maxLevel;i++){
            let p1 = TileLnglatTransformBaidu.lnglatToTile(config.x1, config.y1, i);
            let p2 = TileLnglatTransformBaidu.lnglatToTile(config.x2, config.y2, i);
            count += (Math.abs(p2.tileX - p1.tileX) + 1) * (Math.abs(p2.tileY - p1.tileY) + 1);
        }
        return count
    },
    /**
     * 添加任务
     */
    addTask(){
        tileY++;
        if (tileY > p1.tileY) {
            tileY = p2.tileY;
            tileX++;
            if (tileX > p2.tileX) {
                tileZ++;
                if (tileZ <= config.maxLevel) {
                    p1 = TileLnglatTransformBaidu.lnglatToTile(config.x1, config.y1, tileZ);
                    p2 = TileLnglatTransformBaidu.lnglatToTile(config.x2, config.y2, tileZ);

                    tileY = p2.tileY;
                    tileX = p1.tileX;
                }
            }
        }
        if (tileZ <= config.maxLevel) {
            let task = [tileX, tileY, tileZ];
            taskList.add(`x${tileX}y${tileY}z${tileZ}`);
            console.log(task,'task')
            this.download(task);
            taskCount++;
        }
    },
    /**
     * 启动下载进程
     */
    download(tile){
        let isError = false;
        let [x, y, z] = tile;
        let src = `http://api0.map.bdimg.com/customimage/tile?&qt=tile&x=${x}&y=${y}&z=${z}&customid=${config.customid || ''}&styles=${config.style ? encodeURIComponent(config.style) : ''}`;
        
        let errorHandler = () => {
            if (!isError) {
                isError = true;
                this.errorCallback(tile, src)
            }
        };
        let req=http.get(src,{
            timeout:30000,
            'Transfer-Encoding': 'chunked'
        },res=>{
            let buffer = null
            let contentLength = Number(res.headers['content-length'])
            if (res.statusCode !== 200) {
                errorHandler();
                return;
            }
            res.on('data',chunk=>{
                if(!buffer){
                    buffer = Buffer.from(chunk)
                }else{
                    buffer = Buffer.concat([buffer,chunk])
                }
            }).on('end',()=>{
                if(!isError){
                    if (buffer && res.complete) {
                        this.successCallback(tile, buffer);
                    } else {
                        errorHandler();
                    }
                }
            }).on('aborted',()=>{
                errorHandler()
            })
        }).on('error',()=>{
            errorHandler()
        }).on('timeout',()=>{
            req.destroy()
        })
    },
    /**
     * 下载成功回调
     */
    successCallback(tile, buffer){
        let dir = path.join(config.path, tile[2].toString(), tile[0].toString());
        let fileName = `${tile[1]}.${config.ext || 'png'}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        let stream = fs.createWriteStream(path.join(dir, fileName))
        stream.write(buffer);
        stream.end();
        stream.on('close', () => {
            downCount++;
            downSize += Buffer.byteLength(buffer);
            eventEmitter.emit('singleTileComplete', tile);
        });
    },
    /**
     * 下载失败回调
     */
    errorCallback(tile, src) {
        let key = `x${tile[0]}y${tile[1]}z${tile[2]}`;
        if (errorTilesCount[key] === undefined) {
            errorTilesCount[key] = 0;
        }
        errorTilesCount[key]++;
        //失败重试1000万次
        if (errorTilesCount[key] > 10000000) {
            delete errorTilesCount[key];
            errorCount++;
            console.error((key + '下载失败').red);
            fs.writeFileSync(errLogPath, src + '\r\n', { flag: 'a' }, function (err) {});
            eventEmitter.emit('singleTileComplete', tile);
        } else {
            this.download(tile);
        }
    },
    /**
     * 下载回调方法
     */
    downloadComplete() {
        if (totalCount - errorCount - downCount <= 0) {
            console.info('-------------------------------------------------------------------------------');
            if (errorCount > 0) {
                console.info(`下载完成`);
                console.info(`失败的瓦片请在err.log中查看`);
            } else {
                console.info(`下载完成`);
            }
        }
    },
    /**
     * 下载瓦片
     */
    downloadTiles() {
        if (fs.existsSync(errLogPath)) {
            fs.unlinkSync(errLogPath);
        }
        return new Promise((resolve, reject) => {
            beginTime = new Date();
            totalCount = this.calcTileCount();
            console.info(`开始下载，共有瓦片 ${totalCount.toString()} 张`);
            eventEmitter.on('singleTileComplete', (tile) => {
                taskList.delete(`x${tile[0]}y${tile[1]}z${tile[2]}`);
                if (taskList.size === 0 && taskCount === totalCount) {
                    this.downloadComplete();
                    resolve();
                } else if (taskCount < totalCount) {
                    this.addTask();
                }
            });
            for (let i = 0; i < Math.min(config.threads, totalCount); i++) {
                this.addTask();
            }
        });
    },
    downServer(req, res, next) {
        let datas = req.body
        config = {
            ...configDefault,
            ...datas
        }
        this.init()
        this.downloadTiles()
        res.send({status:200,message:'下载完毕'})
    }
}