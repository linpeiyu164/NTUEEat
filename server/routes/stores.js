// 4000
require('dotenv').config();
const express = require('express');
const router = express.Router();
const Store = require('../model/Store');
const functions = require('../core/functions')
let cloudinary = require('cloudinary').v2

const { checkPrice , getRandom } = functions

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

router.route('/')
.get(async(req,res) => {
    try{
        let allStores = await Store.find({}, 'storename rating _id');
        // return higher ranking restaurants at the front of the array
        allStores.sort((a, b) => {
            if(parseFloat(a.rating) > parseFloat(b.rating)){
                return -1 // 回傳值小於0 a 會排在 b 前面
            }else{
                return 1 
            }
        })
        res.json(allStores);
    }catch(err){
        res.status(400).json({ Error : 'Failed to retrieve restaurant data' })
    }
})
.post(async (req, res) => {
    // console.log(req.body)
    try{
        let price = [];
        switch(req.body.pricing){
            case "$" :
                price = [1, 0, 0]
                break;
            case "$$" : 
                price = [0, 1, 0]
                break;
            case "$$$" : 
                price = [0, 0, 1]
                break;
        }
        const filteredArray = await Store.find({ 
            location : req.body.location, 
            pricing : price, 
            preferences : req.body.preferences
        }, 'storename rating _id')
        if(filteredArray.length !== 0){
            res.json(filteredArray)
        }else{ 
            res.json({ msg : "restaurant not found"})
        }
    }catch(err){
        res.status(400).json({ Error : "Failed to load restaurant data" })
    }
})

router.route('/store/:id')
.get(async (req,res) => {
    //這邊我會給你單一一個店家的「詳細」資料
    const store = await Store.findOne({ _id : req.params.id})
    res.json(store);
})
.post(async(req, res) => {
    /*
    storename
    username
    content
    rating
    storeid
    */
   try{
    const comment =  new Comment({
        store : req.body.storeid,
        storename : req.body.storename,
        username : req.body.username,
        content : req.body.content,
        rating : req.body.rating
    })
    await comment.save();
    let user = await User.findOne({ username : req.body.username })
    await user.comments.push(comment)
    let store = await Store.findOne({ _id : req.body.storeid })
    store.comments.push(comment)
    await store.save()
    res.json(comment)
   }catch(err){
       console.error(err)
       res.status(400).json({ Error : "Failed to add comment" })
   }
}) 

router
.route('/addstore')
.post( async (req, res) => {
    // text information
    // console.log(req.body)
    let checked = checkPrice(req.body.lowestPrice, req.body.highestPrice)
    console.log(checked);
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
            newStore.picture.push(res.url);
        }catch(err){
            console.log(err)
            res.status(500).json({message : 'image failed to upload from server side'})
        }
    })
    await newStore.save();  
    res.redirect('/');
})

router.get('/random', async(req, res) => {
    const result = await getRandom(Store);
    console.log(result)
    res.json(result)
})

module.exports = router;