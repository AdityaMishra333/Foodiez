const express = require('express')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const app = express()
const PORT = 3000;

const UserDetails = require('./models/user')
const AdminDetails = require('./models/admin')
const Order = require('./models/order')
const Menu = require('./models/menu')
const Offer = require('./models/offer')
const { findOne } = require('./models/menu')

const adminMiddleware = require('./middleware/admin-auth')
const offer = require('./models/offer')

require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/menu', require("./routes/menu"))
app.use('/api/orders', require("./routes/orders"))

app.get('/',async(req,res,next)=>{
  
  let token = req.cookies.token
  let user = null
  if(token) {
    try{
      let decoded = jwt.verify(token, process.env.JWT_SECRET)
      user = await UserDetails.findById(decoded.id)
    }
    catch(e){
      user = null
    }
  }
  const items = await Menu.find().lean()
  res.render("index", {user, items})
})

app.get('/login', (req,res)=>{
  res.render("login")
})

app.post('/login', async (req, res) => {
  let { email, password } = req.body
  const user = await UserDetails.findOne({ email })
  if (!user) return res.send("user not found")

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })
      res.cookie('token', token, { httpOnly: true })
      res.redirect('/')
    } 
    else {
      res.send("incorrect password")
    }
  })
})

app.get('/register', (req,res)=>{
  res.render("register")
})

app.post('/register', async(req,res)=>{

  let {email,name,password} = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let CreatedUser = await UserDetails.create({
        name,
        email,
        password : hash
      })
      res.redirect("/login")
      console.log("user created")
      console.log(CreatedUser.name, CreatedUser.password)
    })
  })
})

app.get('/admin-register', (req, res) => {
  res.render("admin-register")
})

app.post('/admin-register', async(req,res)=>{

  let {email,name,password} = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let CreatedAdmin = await AdminDetails.create({
        name,
        email,
        password : hash
      })
      res.redirect("/admin-login")
      console.log("admin created")
      console.log(CreatedAdmin.name, CreatedAdmin.password)
    })
  })
})

app.get('/admin-login', (req, res) => {
  res.render("admin-login")
})

app.post('/admin-login', async (req, res) => {
  let { email, password } = req.body
  const admin = await AdminDetails.findOne({ email })
  if (!admin) return res.send("admin not found")

  bcrypt.compare(password, admin.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })
      res.cookie('token', token, { httpOnly: true })
      res.redirect("/admin-panel")
    } 
    else {
      res.send("incorrect password")
    }
  })
})

app.get("/admin-panel", adminMiddleware, async(req, res) => {
  const items = await Menu.find()
  const offers = await Offer.find()
  res.render("admin-panel", {items, offers})
})

app.get('/track', (req,res)=> {
  const token = req.cookies.token
  if(!token) return res.send("you have to order some food")

  res.render("track")
})

app.post('/order/place' ,async(req,res) => {

  console.log(req.body)
  let {items, totalPrice} = req.body

  let token = req.cookies.token
  if(!token) return res.send('first create or login account')
  let decoded = jwt.verify(token ,process.env.JWT_SECRET )

  let parsedItems = JSON.parse(items)
  let formattedItems = Object.values(parsedItems).map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.qty
  }))

  let order = await Order.create({
    user: decoded.id,
    items: formattedItems,
    totalPrice
  })

  res.redirect('/track')
})

app.get("/offers", (req,res) => {
  res.render("offers")
})

app.post('/logout', (req,res) => {
  res.clearCookie('token')
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});