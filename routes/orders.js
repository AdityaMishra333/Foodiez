const router = require("express").Router()
const OrderDetails = require("../models/order")
const protect = require("../middleware/auth")

router.post('/',protect, async (req,res) => {
    let {items, totalPrice} = req.body
    const user = req.user.id
    await OrderDetails.create({
        user,
        items,
        totalPrice,
    })
    res.send("order placed")
})

router.get("/history", protect, async(req, res) => {
    const orderedItems = await OrderDetails.find({user : req.user.id})

    res.json(orderedItems)
})

module.exports = router