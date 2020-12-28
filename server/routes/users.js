const express = require('express');
const router = express.Router();
const User = require('../model/User')
const Store = require('../model/Store')
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/register', async (req, res) => {
    let { username , password } = req.body
    try{
        const user = await User.findOne({ username : username })
        const hashed = await bcrypt.hash(password, 10)
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

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err)
        if(!user){
            console.log(info.message)
            if(info.message === "username"){
                res.json({ invalidUser : true })
            }else if(info.message === "password"){
                res.json({ invalidPassword : true })
            }
        }else{
            req.logIn(user, (err) => {
                if (err) return next(err)
                res.json(req.user)
            });
        }
    })(req, res, next);
})

router.post('/favorite', async (req,res) => {
    const user = await User.find({username : req.body.username})
    const store = await Store.find({ _id : req.body.store_id })
    store.favorites++;
    user.favorites.push(store);
    await store.save();
    await user.save()
    await user.populate('favorites')
    res.json(user)
})

router.delete('/favorite', async(req,res)=> {
    const user = await User.find({username : req.body.username})
    user.favorites = user.favorites.filter(fav => fav !== req.body.store_id)
    await user.save()
    await user.populate('favorites')
    res.json(user)
})

module.exports = router