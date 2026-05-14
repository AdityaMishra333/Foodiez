const mongoose = require("mongoose")

const UserDetails = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    phone : {
        type : Number,
    },

    password : {
        type : String,
        unique : true,
    }
})

module.exports = mongoose.model("User", UserDetails)