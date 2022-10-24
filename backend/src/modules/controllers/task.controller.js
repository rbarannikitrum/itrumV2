const Task = require('../../db/models/task/index')

module.exports.getAllTasks = (req, res) => {
  Task.find().then(result => {
    res.send(result)
  })}

module.exports.createNewTask = (req, res) => {
  const task = new Task(req.body)
  task.save().then(result => res.send(result))
}

module.exports.changeTaskInfo = (req, res) => {
  Task.findByIdAndUpdate(req.body.id, req.body).then(result => res.send(result))
}

module.exports.deleteTask = (req, res) => {
  Task.findByIdAndDelete({_id: req.query.id}).then(result => res.send(result))
}