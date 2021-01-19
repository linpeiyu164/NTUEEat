const express = require('express');
const router = express.Router();
const User = require('../model/User')
const Store = require('../model/Store')
const Comment = require('../model/Comment')
const ProfilePic = require('../model/ProfilePic')

const bcrypt = require('bcrypt');
const passport = require('passport');
const { getRandom } = require('../core/functions');

router.post('/register', async (req, res) => {
    let { username , password } = req.body
    try{
        const pic = await getRandom(ProfilePic)
        const user = await User.findOne({ username : username })
        const hashed = await bcrypt.hash(password, 10)
        if(user){
            res.json({ isUnique : false })
        }else{
            let newUser = new User({
                username : username,
                password : hashed,
                profilePic : pic.url
            })
            newUser.save() // not awaiting
            console.log(newUser)
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
    const user = await User.findOne({ _id : req.body.userID })
    const store = await Store.findOne({ _id : req.body.storeID })
    store.favorites++;
    user.favorites.push(store._id);
    await store.save();
    await user.save()
    await user.populate('favorites')
    res.json(user.favorites)
})

router.delete('/favorite', async(req,res)=> {
    try{
        const user = await User.findOne({ _id : req.query.USERID }).populate('favorites', 'storename _id')
        let newarray = user.favorites.filter(fav => {
            if(fav._id.toString() !== req.query.STOREID){
                return fav
            }
        })
        user.favorites = [...newarray]
        await user.save()
        const store = await Store.findOne({ _id : req.query.STOREID })
        store.favorites--;
        store.save(); // not awaiting
        res.json(user.favorites)
    }catch(err){
        console.log(err)
    }
})

router.get('/comments/:id', async (req, res) => {
    const user = await User.findOne({ _id : req.params.id }).populate('comments')
    res.json(user.comments)
})

router.get('/favorites/:id', async (req,res)=>{
    const user = await User.findOne({ _id : req.params.id }).populate('favorites', 'storename _id')
    res.json(user.favorites)
})

//edit
router.post('/comments', async (req, res) => {
    console.log(req.body)
    const comment = await Comment.findOne({ _id : req.body._id})
    comment.content = req.body.content
    comment.rating = req.body.rating
    await comment.save()
    res.json(comment)
})

//delete
router.delete(`/comments`, async(req,res) => {
    let user = await User.findOne({ _id : req.query.USERID }).populate('comments')
    let newcomments = user.comments.filter(comment => {
        if(comment._id.toString() !== req.query.COMMENTID){
            return comment
        }
    })
    user.comments = [...newcomments]
    await user.save()
    try{
        await Comment.deleteOne({ _id : req.query.COMMENTID })
    }catch(err){
        console.log(err)
    }
    res.json(user.comments)
})
module.exports = router