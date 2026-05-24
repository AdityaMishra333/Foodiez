const express = require('express')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const app = express()
const PORT = 3000;

const UserDetails = require('./models/user');
const { findOne } = require('./models/menu')

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

app.get('/',(req,res,next)=>{
  res.render("index")
})

app.get('/login', (req,res)=>{
  res.render("login")
})

app.post('/login', async(req,res)=>{
  let {email,password} = req.body
  const user = await UserDetails.findOne({email})
  if(!user) return res.send("user not found")
  if(password !== user.password) return res.send("invalid password")

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: '1d'
  });

  res.cookie('token', token, { httpOnly: true });
  res.redirect('/');
})

app.get('/register', (req,res)=>{
  res.render("register")
})

app.post('/register', async(req,res)=>{

  let {email,name,password} = req.body

  let CreatedUser = await UserDetails.create({
    name,
    email,
    password
  })
  res.redirect("/login")
  console.log("user created")
  console.log(CreatedUser.name)
})

app.get('/track', (req,res)=> {
  const token = req.cookies.token
  if(!token) return res.send("you have to order some food")

  res.render("track")
})

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});