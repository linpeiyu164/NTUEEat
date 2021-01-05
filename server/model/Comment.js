const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    store : {
        type : Schema.Types.ObjectId,
        ref : 'Store'
    },
    storename : String,
    username : String,
    content : String,
    rating : Number
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment;