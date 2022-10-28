const Spend = require('../../db/models/spend/index')

module.exports.createSpend = (req, res) => {
  req.body.time = new Date()
  const spend = new Spend(req.body)
  spend.save().then(result => res.send(result))
}

module.exports.getAllSpends = (req, res) => {
  Spend.find().then(result => {
    res.send(result)
  })
}

module.exports.updateSpend = (req, res) => {
  Spend.findByIdAndUpdate(req.body._id, req.body).then(result => res.send(result))
}

module.exports.deleteSpend = (req, res) => {
  Spend.findByIdAndDelete({_id: req.query._id}).then(result => res.send(result))
}