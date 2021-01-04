const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        unigue : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    favorites : [{ 
        type : Schema.Types.ObjectId, 
        ref : 'Store'
    }],
    comments : [{
        type : Schema.Types.ObjectId,
        ref : 'Comment'
    }]
})
const User = mongoose.model('User', UserSchema)
module.exports = User