const mongoose = require("mongoose")

const OfferDetails = new mongoose.Schema({
    items : [{
        name : {
            type : String
        },
        type : {
            type : String,
            enum : ["large", "medium", "small"]
        },
        quantity : {
            type : Number
        }
    }],

    freeItem : {
        type : String
    },

    minimumOrderValue : {
        type : Number
    },

    specialOccasion : {
        type : String
    },

    discountPercent : {
        type : Number
    },

    applicableOn : {
        type : String
    },

    expiryDate : {
        type : Date
    }
})

module.exports = mongoose.model("offer",OfferDetails)