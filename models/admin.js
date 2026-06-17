const mongoose = require("mongoose")

const AdminDetails = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
    }
})

module.exports = mongoose.model("Admin", AdminDetails)