// 4000
const mongoose = require('mongoose')
const express = require('express');
const Store = require('../model/Store');
const User = require('../model/User')
const router = express.Router();

router.route('/')
.get(async (req,res) => {
    //在首頁一開始跟我拿全部的店家資料(還沒filter之前)
    //storename , rating, _id
    try{
        const allStores = await Store.find({}, 'storename rating _id');
        res.json(allStores);
        // allStores = [{storename : , rating : , _id : }]
    }catch(err){
        res.status(400).json({ msg : 'could not retrieve restaurant data' })
    }
})
.post(async (req, res) => {
    // 這邊要給我你的filter object
    // { location : String , pricing : Number(1最貴 3最便宜), preferences : String }
    const filterArray = await Store.find({ 
        location : location, 
        pricing : pricing, 
        preferences : preferences
    }, 'storename rating _id')
    res.json(filterArray)
})

router.route('/favorite')
.post((req,res) => {
    //這邊你要給我被按愛心的店家的id，還有這個人的username
    //然後我會把他加進他的最愛
    //可以直接用body傳給我
})
.delete((req,res)=> {
    //這邊你要給我被拿掉愛心的店家的id，還有這個人的username
    //然後我會把他刪掉
    //可以用query給我
})

router.route('/store/:id')
.get(async (req,res) => {
    //這邊我會給你單一一個店家的「詳細」資料
    const store = await Store.findOne({ _id : req.params.id})
    res.json(store);
})
.post( async (req,res) => {
    // 這邊你要給我一則評論
    // {
    //     username : String,
    //     content : String,
    //     rating : Number
    // }
    const newComment = {
        username : req.body.username, 
        content : req.body.content, 
        rating : req.body.rating
    }
    // new comment
    const store = await Store.findOne({_id : req.params.id})
    store.comments.push(newComment)
    await store.save()
    // new rating
    let newRating = calculateAverageRating(store);
    store.rating = newRating
    await store.save();

    res.redirect(`/store/${req.params.id}`);
    // 會直接接到這個網站的get request
    // 所以畫面會更新
})
.put((req,res) => {
    //我還沒想好
    //這邊要改留言
})
.delete((req,res) => {
    //我還沒想好
    //這邊要刪留言
})

router
.route('/addstore')
.post(async(req,res) => {
    // 你要給我新增店家的相關資料
    // storename : {
    //     type : String,
    //     required : true
    // },
    // phone:{type : String},
    // rating : {type : Number},
    // picture : [{type : String}],
    // type : {type : String},
    // location : {type : String},
    // address : {type : String},
    // lowestPrice : {type : Number},
    // highestPrice : {type : Number},
    // comments : [{
    //     username : String,
    //     content : String,
    //     rating : Number
    // }],

    let checked = checkPrice(req.body.lowestPrice, req.body.highestPrice)
    const newStore = new Store({
        storename : req.body.storename,
        phone : req.body.phone,
        picture : req.body.picture,
        type : req.body.type,
        location : req.body.location,
        address : req.body.address,
        lowestPrice : req.body.lowestPrice,
        highestPrice : req.body.highestPrice,
        comments : [],
        pricing : checked
    })
    await newStore.save();  
    res.redirect('/');
})

function checkPrice(low, high){
    let avg = Math.round((low + high)/2)
    let array = []
    if(avg > 200){ array[3] = 3 }
    else if(avg < 200 && avg > 100){ array[2] = 2 }
    else{ array[1] = 1 }
    return array
}

function calculateAverageRating(store){
    let avg = 0
    store.comments.forEach(comment => {
        avg += comment.rating
    })
    avg = avg/(store.comments.length)
    if(avg.length > 3){
        avg = `${avg[0]}+${avg[1]}+${avg[3]}`
    }
    return avg;
}
module.exports = router;