const router = require("express").Router()
const MenuDetails = require("../models/menu")

router.get('/', async (req, res) => {
  console.log('GET / hit')
  try {
    const items = await MenuDetails.find().lean()
    // res.render('index', { items: itemsWithId })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error: ' + err.message)
  }
})

router.post('/seed', async (req, res) => {
  const menuData = [
    { id:1, name:"Margherita Pizza", desc:"Classic tomato, mozzarella & fresh basil", price:249, category:"pizza", emoji:"🍕", type:"veg" },
    { id:2, name:"Pepperoni Pizza", desc:"Loaded with spicy pepperoni & cheese", price:329, category:"pizza", emoji:"🍕", type:"nonveg" },
    { id:3, name:"BBQ Chicken Pizza", desc:"Smoky BBQ sauce, grilled chicken, onions", price:359, category:"pizza", emoji:"🍕", type:"nonveg" },
    { id:4, name:"Classic Burger", desc:"Beef patty, lettuce, cheese, pickles", price:179, category:"burger", emoji:"🍔", type:"nonveg" },
    { id:5, name:"Veggie Burger", desc:"Crispy aloo tikki, veggies & special sauce", price:149, category:"burger", emoji:"🍔", type:"veg" },
    { id:6, name:"Zinger Burger", desc:"Crispy fried chicken with coleslaw", price:199, category:"burger", emoji:"🍔", type:"nonveg" },
    { id:7, name:"Chicken Biryani", desc:"Slow-cooked basmati with aromatic spices", price:259, category:"biryani", emoji:"🍛", type:"nonveg" },
    { id:8, name:"Veg Biryani", desc:"Garden fresh veggies in saffron rice", price:199, category:"biryani", emoji:"🍛", type:"veg" },
    { id:9, name:"Mutton Biryani", desc:"Tender mutton pieces in rich biryani", price:329, category:"biryani", emoji:"🍛", type:"nonveg" },
    { id:10, name:"Veg Fried Rice", desc:"Wok-tossed rice with vegetables & soy", price:159, category:"chinese", emoji:"🥡", type:"veg" },
    { id:11, name:"Chilli Chicken", desc:"Crispy chicken in spicy chilli sauce", price:229, category:"chinese", emoji:"🍜", type:"nonveg" },
    { id:12, name:"Paneer Manchurian", desc:"Fried paneer in tangy manchurian gravy", price:199, category:"chinese", emoji:"🥡", type:"veg" },
    { id:13, name:"Chocolate Cake", desc:"Rich dark chocolate layered cake", price:129, category:"dessert", emoji:"🎂", type:"veg" },
    { id:14, name:"Gulab Jamun", desc:"Soft dumplings soaked in sugar syrup", price:79, category:"dessert", emoji:"🍮", type:"veg" },
    { id:15, name:"Ice Cream (2 scoops)", desc:"Vanilla, chocolate or strawberry", price:99, category:"dessert", emoji:"🍦", type:"veg" },
    { id:16, name:"Cold Coffee", desc:"Creamy blended cold coffee with milk", price:89, category:"drinks", emoji:"☕", type:"veg" },
    { id:17, name:"Fresh Lime Soda", desc:"Refreshing lime soda with mint", price:59, category:"drinks", emoji:"🥤", type:"veg" },
    { id:18, name:"Mango Lassi", desc:"Thick creamy mango yogurt drink", price:79, category:"drinks", emoji:"🥛", type:"veg" },
  ]
  await MenuDetails.insertMany(menuData)
  res.send("menu seeded")
})

module.exports = router