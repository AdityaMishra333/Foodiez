const mongoose = require("mongoose")

const OrderDetails = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    items : [
        {
            menuItem : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'menu',
            required : true
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ],

    totalPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        default : "pending"
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("order",OrderDetails)