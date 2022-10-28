let taskInput
let taskArr = []
let text
const tasks = document.querySelector('#tasks')

async function fetchData() {
  setLoader()
  taskArr = await fetch('http://localhost:8000/allTasks',
      {
        method: 'GET', headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
      }).then(res => res.json())
  deleteLoader()
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
  setLoader()
  taskArr = await fetch('http://localhost:8000/task', {
    method: 'PATCH',
    body: JSON.stringify({id: taskArr[i]._id, text: text, isCheck: false}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json())
  deleteLoader()
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
  setLoader()
  taskArr = await fetch('http://localhost:8000/task', {
    method: 'POST',
    body: JSON.stringify({text: taskInput, isCheck: false}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json()).then(res => res.data)
  deleteLoader()
  await fetchData()

}

async function deleteElem(id) {
  setLoader()
  taskArr = await fetch(`http://localhost:8000/task?id=${id}`,
      {method: 'DELETE'}).then(res => res.json()).then(res => res.data)
  deleteLoader()
  await fetchData()

}

async function setActive(i) {
  setLoader()
  taskArr = await fetch('http://localhost:8000/task', {
    method: 'PATCH',
    body: JSON.stringify({id: taskArr[i]._id, text: taskArr[i].text, isCheck: !taskArr[i].isCheck}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json()).then(res => res.data)
  deleteLoader()
  await fetchData()

}

function setEdit(i) {
  render()
  document.getElementById(`task-${i}`).classList.toggle('hidden')
  document.getElementById(`edit-${i}`).classList.toggle('active')
}

function setLoader () {
  const ring = document.createElement('div')
  ring.id = 'ring'
  ring.classList.add('lds-ring')
  tasks.before(ring)

  let firstDiv = document.createElement('div')
  ring.appendChild(firstDiv)

  let secondDiv = document.createElement('div')
  ring.appendChild(secondDiv)

  let thirdDiv = document.createElement('div')
  ring.appendChild(thirdDiv)

  let fourthDiv = document.createElement('div')
  ring.appendChild(fourthDiv)
}

function deleteLoader () {
  let load = document.getElementById('ring')
  load.remove()
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
    inputEdit.addEventListener('change', () => getEdit(i))
    inputEdit.classList.add('edit_text')
    editDiv.appendChild(inputEdit)

    const operatorsDiv = document.createElement('div')
    operatorsDiv.classList.add('operators')
    editDiv.appendChild(operatorsDiv)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('checkbox')
    checkbox.addEventListener('click', () => setActive(i))
    el.isCheck ? checkbox.checked = true : checkbox.checked = false
    operatorsDiv.appendChild(checkbox)

    const saveButton = document.createElement('button')
    saveButton.addEventListener('click', () => {setEditedTask(i)})
    saveButton.innerText = 'Save'
    operatorsDiv.appendChild(saveButton)

    const cancelButton = document.createElement('button')
    cancelButton.addEventListener('click', () => render())
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
    inputCheck.addEventListener('click', () => setActive(i))
    el.isCheck ? inputCheck.checked = true : inputCheck.checked = false
    operators.appendChild(inputCheck)

    const editButton = document.createElement('button')
    el.isCheck ? editButton.classList.add('hide_button') : ''
    editButton.addEventListener('click', () => setEdit(i))
    editButton.innerText = 'Edit'
    operators.appendChild(editButton)

    const deleteButton = document.createElement('button')
    deleteButton.addEventListener('click', () => deleteElem(el._id))
    deleteButton.innerText = 'Delete'
    operators.appendChild(deleteButton)
  })
}