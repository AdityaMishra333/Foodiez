const router = require("express").Router()
const MenuDetails = require("../models/menu")

router.get('/', async(req,res) => {
    const items = await MenuDetails.find()
    res.json(items)
})

router.post('/seed', async(req,res) => {
    await MenuDetails.create({
        name : "Burger",
        price : 99,
        category : "fast food",
        image : "burger.jpg",
        available : true
    })
    res.send("menu created")
})

module.exports = router