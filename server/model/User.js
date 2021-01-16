const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // user id will be generated 
    username : {
        type : String,
        unigue : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    favorites : [{ store_id : Schema.Types.ObjectId }]
})
const User = mongoose.model('User', UserSchema)
module.exports = User