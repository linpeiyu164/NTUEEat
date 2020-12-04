// 4000
const express = require('express');
const Store = require('../model/Store');
const router = express.Router();

router.route('/')
.get((req,res) => {
    //在首頁一開始跟我拿全部的店家資料(還沒filter之前)
    //storename , rating, _id
    try{
        const allStores = await Store.find({}, 'storename rating _id');
    }catch(err){
        res.status(400).json({ msg : 'could not retrieve restaurant data' })
    }
})
.post((req, res) => {
    // 這邊要給我你的filter object
    // { location : String , pricing : Number(1最貴 3最便宜), preferences : String }
})

router.route('/favorite')
.post((req,res) => {
    //這邊你要給我被按愛心的店家的id，還有這個人的username
    //然後我會把他加進他的最愛
})
.delete((req,res)=> {
    //這邊你要給我被拿掉愛心的店家的id，還有這個人的username
    //然後我會把他刪掉
})

router.route('/store/:id')
.get((req,res) => {
    //這邊我會給你單一一個店家的「詳細」資料
    const store = await Store.findOne({ _id : req.params.id})
    res.json(store);
})
.post((req,res) => {
    // 這邊你要給我一則評論
    // {
    //     username : String,
    //     content : String,
    //     rating : Number
    // }
})
.put((req,res) => {
    //我還沒想好
    //這邊要改留言
})
.delete((req,res) => {
    //我還沒想好
    //這邊要刪留言
})

router.route('/addstore')
.post((req,res) => {
    //你要給我新增店家的相關資料
})