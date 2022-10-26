let taskInput
let taskArr = []
let text
const tasks = document.querySelector('#tasks')


async function fetchData() {
  taskArr = await fetch('http://localhost:8000/allTasks',
      {
        method: 'GET', headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
      }).then(res => res.json())
  render()
}


function getTask() {
  taskInput = document.querySelector("input").value
}

function getEdit(i) {
  text = document.getElementById(`change-${i}`).value
}

async function setEditedTask(i) {
  getEdit(i)
  if (!text) {
    text = taskArr[i].text
  }
  taskArr[i].text = text
  taskArr = await fetch('http://localhost:8000/updateTask', {
    method: 'PATCH',
    body: JSON.stringify({id: taskArr[i]._id, text: text, isCheck: false}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json())
  await fetchData()

}

async function addTask() {
  getTask()
  if (!taskInput.length) {
    return
  }
  if (!taskInput.trim()) {
    return
  }
  taskInput = taskInput.trim()
  document.querySelector('input').focus()
  document.querySelector('input').value = ''
  taskArr = await fetch('http://localhost:8000/createTask', {
    method: 'POST',
    body: JSON.stringify({text: taskInput, isCheck: false}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json()).then(res => res.data)

  await fetchData()

}

async function deleteElem(i) {
  taskArr = await fetch(`http://localhost:8000/deleteTask?id=${taskArr[i]._id}`, {method: 'DELETE'}).then(res => res.json()).then(res => res.data)
  await fetchData()

}

async function setActive(i) {
  taskArr = await fetch('http://localhost:8000/updateTask', {
    method: 'PATCH',
    body: JSON.stringify({id: taskArr[i]._id, text: taskArr[i].text, isCheck: !taskArr[i].isCheck}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json()).then(res => res.data)
  await fetchData()

}

function setEdit(i) {
  render()
  document.getElementById(`task-${i}`).classList.toggle('hidden')
  document.getElementById(`edit-${i}`).classList.toggle('active')
}


function render() {
  taskArr = taskArr.sort((a, b) => a.isCheck - b.isCheck)
  tasks.innerHTML = ''
  taskArr.forEach((el, i) => {

    const editDiv = document.createElement('div')
    editDiv.classList.add('edit')
    editDiv.classList.add('hidden')
    editDiv.id = `edit-${i}`
    tasks.appendChild(editDiv)

    const inputEdit = document.createElement('input')
    inputEdit.id = `change-${i}`
    inputEdit.type = 'text'
    inputEdit.value = taskArr[i].text
    inputEdit.onchange = () => getEdit(i)
    inputEdit.classList.add('edit_text')
    editDiv.appendChild(inputEdit)

    const operatorsDiv = document.createElement('div')
    operatorsDiv.classList.add('operators')
    editDiv.appendChild(operatorsDiv)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('checkbox')
    checkbox.onclick = () => setActive(i)
    el.isCheck ? checkbox.checked = true : checkbox.checked = false
    operatorsDiv.appendChild(checkbox)

    const saveButton = document.createElement('button')
    saveButton.onclick = () => setEditedTask(i)
    saveButton.innerText = 'Save'
    operatorsDiv.appendChild(saveButton)

    const cancelButton = document.createElement('button')
    cancelButton.onclick = () => render()
    cancelButton.innerText = 'Cancel'
    operatorsDiv.appendChild(cancelButton)



    const taskDiv = document.createElement('div')
    taskDiv.id = `task-${i}`
    taskDiv.classList.add('task')
    tasks.appendChild(taskDiv)

    const taskText = document.createElement('div')
    taskText.classList.add('task_text')
    taskDiv.appendChild(taskText)

    const text = document.createElement('p')
    el.isCheck ? text.classList.add('completed') : ''
    text.innerText = `${i + 1}. ${el.text}`
    taskText.appendChild(text)

    const operators = document.createElement('div')
    operators.classList.add('operators')
    taskDiv.appendChild(operators)

    const inputCheck = document.createElement('input')
    inputCheck.type = 'checkbox'
    inputCheck.onclick = () => setActive(i)
    el.isCheck ? inputCheck.checked = true : inputCheck.checked = false
    operators.appendChild(inputCheck)

    const editButton = document.createElement('button')
    el.isCheck ? editButton.classList.add('hidden') : ''
    console.log(el.isCheck)
    editButton.onclick = () => setEdit(i)
    editButton.innerText = 'Edit'
    operators.appendChild(editButton)

    const deleteButton = document.createElement('button')
    deleteButton.onclick = () => deleteElem(i)
    deleteButton.innerText = 'Delete'
    operators.appendChild(deleteButton)

  })
}