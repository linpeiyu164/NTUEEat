const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Store = new Schema({
    storename : String,
    rank : Number,
    // picture : [String],
    type : String,
    location : String,
})