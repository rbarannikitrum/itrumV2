const mongoose = require('mongoose')

const spendScheme = new mongoose.Schema({
  place: String,
  time: Date,
  price: Number,
  timeStamp : Date /// add rn
})

  module.exports = Spend = mongoose.model('spends', spendScheme)