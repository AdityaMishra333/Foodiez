const express = require('express')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')

const app = express()
const PORT = 3000;

app.use(express.json())
app.use(cookieparser())

app.get('/',(req,res,next)=>{
    res.send("foodiez-app")
})

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});