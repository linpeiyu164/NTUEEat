// 4000
require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const Store = require('../model/Store');

let cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

router.route('/')
.get(async (req,res) => {
    try{
        const allStores = await Store.find({}, 'storename rating _id');
        res.json(allStores);
    }catch(err){
        res.status(400).json({ msg : 'could not retrieve restaurant data' })
    }
})
.post(async (req, res) => {
    const filteredArray = await Store.find({ 
        location : location, 
        pricing : pricing, 
        preferences : preferences
    }, 'storename rating _id')
    res.json(filteredArray)
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
.post( async (req, res) => {
    // text information
    let checked = checkPrice(req.body.lowestPrice, req.body.highestPrice)
    let newStore = new Store({
        storename : req.body.storename,
        phone : req.body.phone,
        picture : [] ,
        type : req.body.type,
        location : req.body.location,
        address : req.body.address,
        lowestPrice : req.body.lowestPrice,
        highestPrice : req.body.highestPrice,
        comments : [],
        pricing : checked
    })
    // image uploading
    const fileStrArray = req.body.images;
    fileStrArray.forEach(async fileStr => {
        try{
            const res = await cloudinary.uploader.upload(fileStr, {
                upload_preset : 'ml_default',
            })
            // console.log(res);
            newStore.picture.push(res.url);
        }catch(err){
            console.log(err)
            res.status(500).json({message : 'image failed to upload from server side'})
        }
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