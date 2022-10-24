const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const apiRoutes = require('./modules/routes/routes')
app.use(cors())
app.use(express.json())
app.use('/', apiRoutes)

const uri = 'mongodb+srv://rbarannikitrum:restart987@cluster0.lzarcb4.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {useNewURLParser: true, useUnifiedTopology: true})

app.listen(8000, () => {
  console.log('hello')
})
