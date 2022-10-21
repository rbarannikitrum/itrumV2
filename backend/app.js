const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())


const taskScheme = new mongoose.Schema({
  text : String,
  isCheck : Boolean
})

const uri = 'mongodb+srv://rbarannikitrum:restart987@cluster0.lzarcb4.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {useNewURLParser : true, useUnifiedTopology : true})

const Task = mongoose.model('tasks', taskScheme)

app.post('/createTask', (req, res) => {
  const task = new Task(req.body)
  console.log(req.body)
  task.save().then(result => res.send(result))
})

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {res.send({data : result})})
})

app.put('/updateTask', (req, res) => {

})

app.delete('/deleteTask', (req, res) => {
  Task.findOne({_id: req.body._id}, (err, result) => {res.send(result)})
})



app.listen(8000, () => {console.log('hello')})
