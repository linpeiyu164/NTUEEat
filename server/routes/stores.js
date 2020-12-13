// 4000
const mongoose = require('mongoose')
const express = require('express');
const Store = require('../model/Store');
const User = require('../model/User')
const router = express.Router();
const multer = require('multer');
const { getNodeText } = require('@testing-library/react');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, '../uploads/');
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true) // accept
    }else{
        cb(new Error('please make sure the file is in jpeg or png format')) // reject
    }
}
const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 1
    },
    fileFilter : fileFilter
})

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
    const filteredArray = await Store.find({ 
        location : location, 
        pricing : pricing, 
        preferences : preferences
    }, 'storename rating _id')
    res.json(filteredArray)
})

router.route('/favorite')
.post(async (req,res) => {
    //這邊你要給我被按愛心的店家的id，還有這個人的username
    //然後我會把他加進他的最愛
    //可以直接用body傳給我
    const user = await User.find({username : req.body.username})
    const newfavorite = { store_id : req.body.store_id }
    user.favorites.push(newfavorite);
    user.save()
    .then( user => {
        res.json(user) //回傳user給你所以應該可以拿到他的favorites
    })
    .catch(err => {
        res.status(400);
    })
})
.delete((req,res)=> {
    //這邊你要給我被拿掉愛心的店家的id，還有這個人的username
    //然後我會把他刪掉
    //可以用query給我
    const user = await User.find({username : req.body.username})
    const removefavorite = { store_id : req.body.store_id }
    user.favorites = user.favorites.filter(fav => fav.store_id !== req.body.store_id)
    user.save()
    .then( user => {
        res.json(user) //回傳user給你所以應該可以拿到他的favorites
    })
    .catch(err => {
        res.status(400);
    })
})

router.route('/store/:id')
.get(async (req,res) => {
    //這邊我會給你單一一個店家的「詳細」資料
    const store = await Store.findOne({ _id : req.params.id})
    res.json(store);
})
.post( async(req,res) => {
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
    // 會直接接到這個url的get request
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
.post(upload.array('storeImage', 3), async(req,res) => {
    let files = req.files
    if(!files){
        const error = new Error('please upload a file')
        res.status(400).json({ err : 'no files exist'})
    }else{
        
    }
    let checked = checkPrice(req.body.lowestPrice, req.body.highestPrice)
    const newStore = new Store({
        storename : req.body.storename,
        phone : req.body.phone,
        picture : req.files.path,
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
    avg = toString(avg)
    if(avg.length > 3){
        avg = `${avg[0]}+${avg[1]}+${avg[2]}`
    }
    return avg;
}
module.exports = router;