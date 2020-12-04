const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    storename : {
        type : String,
        required : true
    },
    phone:{type : String},
    rating : {type : Number},
    picture : [{type : String}],
    type : {type : String},
    location : {type : String},
    address : {type : String},
    lowestPrice : {type : Number},
    highestPrice : {type : Number},
    comments : [{
        username : String,
        content : String,
        rating : Number
    }],
})

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store