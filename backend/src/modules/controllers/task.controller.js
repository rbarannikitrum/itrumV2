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
  try {
    if (typeof req.body.isCheck === 'boolean' &&
        req.body.text &&
        typeof req.body.text === 'string') {
      const task = new Task(req.body)
      task.save()
          .then(result => res.send(result))
          .catch(error => res.send(error))
    } else res.status(400).send('error')
  } catch (error) {
    res.status(500).send(`server error : ${error}`)
  }

}

module.exports.changeTaskInfo = (req, res, next) => {
  try {
    if (typeof req.body.isCheck === 'boolean' &&
        req.body.text &&
        typeof req.body.text === 'string') {
      Task.findByIdAndUpdate(req.body.id, {text: req.body.text, isCheck: req.body.isCheck})
          .then(result => res.send(result))
          .catch(error => next(error))
    } else res.status(400).send('error')
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