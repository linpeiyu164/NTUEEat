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

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ userExists : true, passWordIsValid : true})
})

router.post('/favorite', passport.authenticate('local') ,async (req,res) => {
    const user = await User.find({username : req.body.username})
    const newfavorite = { store_id : req.body.store_id }
    const store = await Store.find({ _id : store_id })
    store.favorites++;
    user.favorites.push(newfavorite);
    await store.save();
    user.save()
    .then(user => {
        res.json(user) 
    })
    .catch(err => {
        res.status(400).json({error : err});
    })
})

router.delete('/favorite', passport.authenticate('local'), async(req,res)=> {
    const user = await User.find({username : req.body.username})
    user.favorites = user.favorites.filter(fav => fav.store_id !== req.body.store_id)
    user.save()
    .then( user => {
        res.json(user) 
    })
    .catch(err => {
        res.status(400).json({ error : err });
    })
})

module.exports = router