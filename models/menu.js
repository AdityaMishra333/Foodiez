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
    image : {
        type : String,
        required : true
    },
    available : {
        type : Boolean,
        required : true
    }
})

module.exports = mongoose.model("menu",MenuDetails)