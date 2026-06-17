const mongoose = require("mongoose")

const MenuDetails = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    emoji : {
        type : String,
    },
    available : {
        type : Boolean,
    }
})

module.exports = mongoose.model("menu",MenuDetails)