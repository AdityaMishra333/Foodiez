const router = require("express").Router()
const protect = require("../middleware/admin-auth")
const OfferDetails = require("../models/offer")
const MenuDetails = require("../models/menu")
const OrderDetails = require("../models/order")

router.post('/offers', protect, async (req, res) => {
    let { items, specialOccasion, discountPercent, minimumOrderValue, freeItem, applicableOn, expiryDate } = req.body

    if (!specialOccasion || !discountPercent) {
        return res.redirect('/admin-panel')
    }

    await OfferDetails.create({
        items,
        specialOccasion,
        discountPercent,
        minimumOrderValue,
        freeItem,
        applicableOn,
        expiryDate
    })

    res.redirect('/admin-panel')
})

router.post('/items', protect, async (req, res) => {

    const { itemId, name, price, type, category, emoji, desc } = req.body
    
        await MenuDetails.findByIdAndUpdate(itemId, { 
        name, 
        price, 
        category, 
        emoji,
        desc })

    res.redirect('/admin-panel')
})

router.post('/new-item', protect, async (req, res) => {
    const { name, price, type, category, emoji, desc} = req.body

    await MenuDetails.create({
        name, 
        price, 
        type,
        category, 
        emoji,
        desc
    })

    res.redirect('/admin-panel')
})

module.exports = router
