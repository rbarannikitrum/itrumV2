const express = require('express')
const mongoose = require('mongoose')
const app = express()

const taskScheme = new mongoose.Schema({
  text : String,
  isCheck : Boolean
})

const uri = 'mongodb+srv://rbarannikitrum:restart987@cluster0.lzarcb4.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {useNewURLParser : true, useUnifiedTopology : true})

const Task = mongoose.model('tasks', taskScheme)

app.post('/createTask', (req, res) => {
  const task = new Task(req.body)
  task.save().then(result => res.send('task created'))
})

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {res.send({data : result})})
})

app.put('/updateTask', (req, res) => {
  Task.find(req.body._id).then(result => console.log(result))
})



app.listen(8000, () => {console.log('hello')})
