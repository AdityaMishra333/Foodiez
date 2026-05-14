const express = require('express')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')

const app = express()
const PORT = 3000;

require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.use(express.json())
app.use(cookieparser())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/menu', require("./routes/menu"))
app.use('/api/orders', require("./routes/orders"))

app.get('/',(req,res,next)=>{
    res.send("foodiez-app")
})

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});