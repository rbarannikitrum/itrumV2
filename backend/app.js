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

app.get('/', (req, res) => {
  const task = new Task({
    text : 't123',
    isCheck : false
  })
  task.save().then(result => res.send(result))
})

app.get('/all', (req, res) => {
  Task.find().then(result => {res.send(result)})
})


app.listen(8000, () => {console.log('hello')})
