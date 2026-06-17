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
            food : [{
                name : {
                    type : String
                },
                quantity : {
                    type : Number
                }
            }],
            colddrink : [{
                name : {
                    type : String
                },
                quantity : {
                    type : Number
                }
            }],
            dessert : [{
                name : {
                    type : String
                },
                quantity : {
                    type : Number
                }
            }]
        },

    minimumOrderValue : {
        type : Number
    },

    specialOccasion : {
        type : String
    },

    discountPercent : {
        type : Number
    }
})

module.exports = mongoose.model("offer",OfferDetails)