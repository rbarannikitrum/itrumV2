const Spend = require('../../db/models/spend/index')

module.exports.createSpend = (req, res) => {
  const {place, price} = req.body
  try {
    if (typeof place === 'string' &&
        place &&
        price &&
        price > 0
    ) {
      const time = new Date()
      const timeStamp = new Date()
      const spend = new Spend({place, time, price, timeStamp})
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
    const time = new Date(req.body.time)
    const timeStamp =  new Date(req.body.timeStamp)
    const {_id, place, price} = req.body
    if (typeof place === 'string' &&
        place &&
        price &&
        price > 0 &&
        time.toString() != 'Invalid Date' &&
        Math.abs(new Date(time) - new Date(timeStamp)) / (60 * 60 * 24 * 1000) > 7
    ) {
      Spend.findByIdAndUpdate(_id, {place, time, price}).then(result => res.send(result))
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