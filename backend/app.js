require('dotenv').config({path:'.env'});
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const  apiRoutes = require('./src/modules/routes/routes')
app.use(cors())
app.use(express.json())
app.use('/', apiRoutes)


console.log(process.env.URI_SPEND)
mongoose.connect (process.env.URI_SPEND, {useNewURLParser: true, useUnifiedTopology: true})



app.listen(process.env.PORT, () => {
  console.log('hello')
})