const Task = require('../../db/models/task/index')

module.exports.getAllTasks = (req, res) => {
  try {
    Task.find().then(result => {
      res.send(result)
    })
  } catch (error) {
    res.status(500).send(`server error : ${error}`)
  }
}

module.exports.createNewTask = (req, res) => {
  const {text, isCheck} = req.body
  try {
    if (typeof isCheck === 'boolean' &&
        text &&
        typeof text === 'string') {
      const task = new Task({text, isCheck})
      task.save()
          .then(result => res.send(result))
    } else res.status(400).send('uncorrected data')
  } catch (error) {
    res.status(500).send(`server error : ${error}`)
  }

}

module.exports.changeTaskInfo = (req, res) => {
  console.log(req.body)
  const {_id, text, isCheck} = req.body
  try {
    if (typeof isCheck === 'boolean' &&
        text &&
        typeof text === 'string') {

      Task.findByIdAndUpdate(_id, {text, isCheck}, {new: true})
          .then(result => res.send(result))
    } else res.status(400).send('uncorrected data')
  } catch (error) {
    res.status(500).send(`error : ${error}`)
  }


}

module.exports.deleteTask = (req, res) => {
  try {
    Task.findByIdAndDelete({_id: req.query.id})
        .then(result => res.send(result))
  } catch (error) {
    res.status(500).send(`error : ${error}`)
  }

}