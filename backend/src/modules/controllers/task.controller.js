const Task = require('../../db/models/task/index')

module.exports.getAllTasks = (req, res, next) => {
  Task.find().then(result => {
    res.send(result)
  })
      .catch(error => res.status(500).send('server error'))
}

module.exports.createNewTask = (req, res, next) => {
  if (typeof req.body.isCheck === 'boolean' &&
      req.body.text &&
      typeof req.body.text === 'string') {
    const task = new Task(req.body)
    task.save()
        .then(result => res.send(result))
        .catch(error => next(error))
  } else res.status(400).send('error')
}

module.exports.changeTaskInfo = (req, res, next) => {
  if (typeof req.body.isCheck === 'boolean' &&
      req.body.text &&
      typeof req.body.text === 'string') {
    Task.findByIdAndUpdate(req.body.id, {text: req.body.text, isCheck: req.body.isCheck})
        .then(result => res.send(result))
        .catch(error => next(error))
  } else res.status(400).send('error')

}

module.exports.deleteTask = (req, res, next) => {
  Task.findByIdAndDelete({_id: req.query.id})
      .then(result => res.send(result))
      .catch(res.status(500).send('task not found'))
}