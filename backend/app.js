const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const spendScheme = new mongoose.Schema({
  place : String,
  time : Date,
  price : Number
})

const Spend = mongoose.model('spends', spendScheme)

const uri = 'mongodb+srv://rbarannikitrum:restart987@cluster0.lzarcb4.mongodb.net/spends?retryWrites=true&w=majority'

mongoose.connect (uri, {useNewURLParser: true, useUnifiedTopology: true})

app.post('/createSpend', (req, res) => {
  req.body.time = new Date()
  const spend = new Spend(req.body)
  spend.save().then(result => res.send(result))
})

app.get('/allSpends', (req, res) => {
  Spend.find().then(result => {
    res.send(result)
  })
})

app.patch('/updateSpend', (req, res) => {

  Spend.findByIdAndUpdate(req.body._id, req.body).then(result => res.send(result))
})

app.delete('/deleteSpend', (req, res) => {
  Spend.findByIdAndDelete({_id: req.query._id}).then(result => res.send(result))
})




app.listen(8000, () => {
  console.log('hello')
})