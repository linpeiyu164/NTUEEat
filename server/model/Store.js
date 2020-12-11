const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    storename : {
        type : String,
        unique : true,
        required : true
    },
    phone:{
        type : String,
        unique : true,
        required : true
    },
    rating : String,
    picture : [{type : String}],
    type : [{type : String}],
    pricing : [{type : Number}], // [1, 0, 0] or [0, 2, 0] or [0, 0, 3]
    location : {
        type : String,
        unique : true,
        required : true
    },
    address : {
        type : String,
        unique : true,
        required : true
    },
    lowestPrice : {
        type : Number,
        required : true
    },
    highestPrice : {
        type : Number,
        required : true
    },
    comments : [{
        username : String,
        content : String,
        rating : Number
    }],
})

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store