const api = require('./api/index');
// 下载瓦片
api.downloadTiles().then(() => {
    process.exit();
});
