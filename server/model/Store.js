const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    storename : {
        type : String,
        required : true,
        unique : true
    },
    phone:{
        type : String,
        required : true,
        unique : true
    },
    rating : String,
    picture : [{type : String}],
    type : [{type : String}],
    pricing : [{type : Number}], // [1, 0, 0] or [0, 2, 0] or [0, 0, 3]
    location : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
        unique : true
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