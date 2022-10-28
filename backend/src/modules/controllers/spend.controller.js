const Spend = require('../../db/models/spend/index')

module.exports.createSpend = (req, res) => {
  try {
    if (typeof req.body.place === 'string' &&
        req.body.place &&
        req.body.price &&
        req.body.price > 0
    ) {
      req.body.time = new Date()
      const spend = new Spend(req.body)
      spend.save().then(result => res.send(result))
    } else {
      res.status(400).send ('uncorrected data')
    }
  }
  catch (error) {
    res.status(500).send(`server error : ${error}`)
  }


}

module.exports.getAllSpends = (req, res) => {
  try {
    Spend.find().then(result => {
      res.send(result)
    })
  }
  catch (error) {
    res.status(500).send(`server error : ${error}`)
  }

}

module.exports.updateSpend = (req, res) => {
  try {
    const date = new Date(req.body.time)
    if (typeof req.body.place === 'string' &&
        req.body.place &&
        req.body.price &&
        req.body.price > 0 &&
        date != 'Invalid Date'
    ) {
      Spend.findByIdAndUpdate(req.body._id, req.body).then(result => res.send(result))
    } else res.status(400).send('uncorrected data')
  }
  catch (error) {
    res.status(500).send(`server error : ${error}`)
  }

}

module.exports.deleteSpend = (req, res) => {
  try {
    Spend.findByIdAndDelete({_id: req.query._id}).then(result => res.send(result))
  }
  catch (error) {
    res.status(500).send(`server error : ${error}`)
  }
}