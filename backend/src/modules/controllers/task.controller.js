const Task = require('../../db/models/task/index')

module.exports.getAllTasks = (req, res, next) => {
  Task.find().then(result => {
    res.send(result)
  })
      .catch(error => next(error))
  }

module.exports.createNewTask = (req, res, next) => {
  const task = new Task(req.body)
  task.save()
      .then(result => res.send(result))
      .catch(error => next(error))
}

module.exports.changeTaskInfo = (req, res, next) => {
  console.log(req.body)
  Task.findByIdAndUpdate(req.body.id, req.body)
      .then(result => res.send(result))
      .catch(error => next(error))
}

module.exports.deleteTask = (req, res, next) => {
  Task.findByIdAndDelete({_id: req.query.id})
      .then(result => res.send(result))
      .catch(error => next(error))
}