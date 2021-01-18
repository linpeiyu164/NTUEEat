const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

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
    rating : Number,
    picture : [{type : String}],
    type : [{type : String}],
    pricing : [{type : Number}], // [1, 0, 0] or [0, 1, 0] or [0, 0, 1]
    location : {
        type : String,
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
        type : Schema.Types.ObjectId,
        ref : 'Comment'
    }],
    favorites : {
        type : Number,
        default : 0
    }
})

StoreSchema.plugin(mongooseFuzzySearching, { fields: ['storename'] })

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store