const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfilePicSchema = new Schema({
    url : String
})

const ProfilePic = mongoose.model('ProfilePic', ProfilePicSchema)
module.exports = ProfilePic