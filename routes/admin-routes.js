const router = require("express").Router()
const path = require("path")
const fs = require("fs")
const multer = require("multer")
const protect = require("../middleware/admin-auth")
const OfferDetails = require("../models/offer")
const MenuDetails = require("../models/menu")
const OrderDetails = require("../models/order")

// uploaded item images live in public/uploads so express.static serves them
const uploadDir = path.join(__dirname, "..", "public", "uploads")
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase()
        cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith("image/"))
})

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

router.post('/items', protect, upload.single('image'), async (req, res) => {

    const { itemId, name, price, type, category, desc } = req.body

    // only overwrite fields the admin actually filled in
    const updates = { type, category }
    if (name) updates.name = name
    if (price) updates.price = price
    if (desc) updates.desc = desc
    if (req.file) updates.image = '/uploads/' + req.file.filename

    await MenuDetails.findByIdAndUpdate(itemId, updates)

    res.redirect('/admin-panel')
})

router.post('/new-item', protect, upload.single('image'), async (req, res) => {
    const { name, price, type, category, desc } = req.body

    await MenuDetails.create({
        name,
        price,
        type,
        category,
        desc,
        image: req.file ? '/uploads/' + req.file.filename : undefined
    })

    res.redirect('/admin-panel')
})

module.exports = router
