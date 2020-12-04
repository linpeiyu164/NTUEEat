const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // user id will be generated 
    username : {
        type : String,
        unigue : true,
        required : true
    },
    // favorites : [ObjectId('Store')]
})
const User = mongoose.model('User', UserSchema)
module.exports = User