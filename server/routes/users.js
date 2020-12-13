const express = require('express');
const router = express.Router();
const User = require('../model/User')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    let { username , password } = req.body
    try{
        const user = await User.findOne({ username : username })
        const hashed = await bcrypt.hash( password, 10)
        if(user){
            res.json({ isUnique : false })
        }else{
            let newUser = new User({
                username : username,
                password : hashed
            })
            newUser.save() // not awaiting
            res.json({ isUnique : true })
        }
    }catch(err){
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    let { username , password } = req.body
    try{
        const user = await User.findOne({ username : username })
        if(!user){
            res.json({ userExists : false })
        }else{
            try{
                let passWordIsValid = await bcrypt.compare(password, user.password)
                res.json({ userExists : true, passWordIsValid : passWordIsValid })
            }catch(err){
                res.status(500)
            }
        }
    }catch(err){
        console.log(err)
    }
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
    .then(user => {
        res.json(user) //回傳user給你所以應該可以拿到他的favorites
    })
    .catch(err => {
        res.status(400).json({error : err});
    })
})
.delete(async(req,res)=> {
    //這邊你要給我被拿掉愛心的店家的id，還有這個人的username
    //然後我會把他刪掉
    //可以用query給我
    const user = await User.find({username : req.body.username})
    // const removefavorite = { store_id : req.body.store_id }
    user.favorites = user.favorites.filter(fav => fav.store_id !== req.body.store_id)
    user.save()
    .then( user => {
        res.json(user) //回傳user給你所以應該可以拿到他的favorites
    })
    .catch(err => {
        res.status(400).json({error : err});
    })
})

module.exports = router