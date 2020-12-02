const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Comment = new Schema({
    username : String,
    rank : Number,
    content : String
})