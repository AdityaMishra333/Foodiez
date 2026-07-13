// One-time migration: give existing menu items a real photo and drop the old emoji field.
// Run with: node scripts/add-menu-images.js
require('dotenv').config()
const mongoose = require('mongoose')

const exactMatch = {
  "margherita pizza": "margherita-pizza.jpg",
  "pepperoni pizza": "pepperoni-pizza.jpg",
  "bbq chicken pizza": "bbq-chicken-pizza.jpg",
  "classic burger": "classic-burger.jpg",
  "veggie burger": "veggie-burger.jpg",
  "zinger burger": "zinger-burger.jpg",
  "chicken biryani": "chicken-biryani.jpg",
  "veg biryani": "veg-biryani.jpg",
  "mutton biryani": "mutton-biryani.jpg",
  "veg fried rice": "veg-fried-rice.jpg",
  "chilli chicken": "chilli-chicken.jpg",
  "paneer manchurian": "paneer-manchurian.jpg",
  "chocolate cake": "chocolate-cake.jpg",
  "gulab jamun": "gulab-jamun.jpg",
  "ice cream (2 scoops)": "ice-cream.jpg",
  "cold coffee": "cold-coffee.jpg",
  "fresh lime soda": "fresh-lime-soda.jpg",
  "mango lassi": "mango-lassi.jpg",
}

// fallbacks for items whose names don't match the seed data exactly
const keywordMatch = [
  ["pepperoni", "pepperoni-pizza.jpg"],
  ["bbq", "bbq-chicken-pizza.jpg"],
  ["pizza", "margherita-pizza.jpg"],
  ["burger", "classic-burger.jpg"],
  ["biryani", "chicken-biryani.jpg"],
  ["rice", "veg-fried-rice.jpg"],
  ["paneer", "paneer-manchurian.jpg"],
  ["chicken", "chilli-chicken.jpg"],
  ["cake", "chocolate-cake.jpg"],
  ["jamun", "gulab-jamun.jpg"],
  ["ice cream", "ice-cream.jpg"],
  ["coffee", "cold-coffee.jpg"],
  ["soda", "fresh-lime-soda.jpg"],
  ["lime", "fresh-lime-soda.jpg"],
  ["lassi", "mango-lassi.jpg"],
]

const categoryMatch = {
  italian: "margherita-pizza.jpg",
  indian: "veg-biryani.jpg",
  chinese: "veg-fried-rice.jpg",
  dessert: "chocolate-cake.jpg",
  drinks: "cold-coffee.jpg",
}

function pickImage(item) {
  const name = (item.name || '').toLowerCase().trim()
  if (exactMatch[name]) return exactMatch[name]
  for (const [word, img] of keywordMatch) {
    if (name.includes(word)) return img
  }
  const cat = (item.category || '').toLowerCase().trim()
  return categoryMatch[cat] || null
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log("connected")

  // raw collection so we can $unset emoji even though it's gone from the schema
  const col = mongoose.connection.db.collection('menus')
  const items = await col.find({}).toArray()
  console.log(`found ${items.length} menu items`)

  for (const item of items) {
    const update = { $unset: { emoji: "" } }
    let picked = "kept existing image"

    if (!item.image) {
      const img = pickImage(item)
      if (img) {
        update.$set = { image: "/images/menu/" + img }
        picked = img
      } else {
        picked = "no match -> placeholder shown by frontend"
      }
    }

    await col.updateOne({ _id: item._id }, update)
    console.log(`- ${item.name}: ${picked}`)
  }

  await mongoose.disconnect()
  console.log("done")
}

run().catch(err => { console.error(err); process.exit(1) })
