const express =require('express')
const router = express.Router()
const api = require('./api/index')


router.post('/down',(req,res,next)=>{
    api.downServer(req,res,next)
})

module.exports = router;