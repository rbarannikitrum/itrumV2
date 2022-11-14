let taskArr = []

async function getReq() {
  taskArr = await fetch('http://localhost:8000/allTasks',
      {
        method: 'GET',
        headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
      }).then(res => res.json())
}

async function createReq(taskInput) {
  taskArr = await fetch('http://localhost:8000/task', {
    method: 'POST',
    body: JSON.stringify({text: taskInput, isCheck: false}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json()).then(res => res.data)
}

async function deleteReq(id) {
  taskArr = await fetch(`http://localhost:8000/task?id=${id}`,
      {method: 'DELETE'}).then(res => res.json()).then(res => res.data)
}

async function patchReq(i, text) {
  taskArr = await fetch('http://localhost:8000/task', {
    method: 'PATCH',
    body: JSON.stringify({id: taskArr[i]._id, text: text, isCheck: taskArr[i].isCheck}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json()).then(res => res.data)
}


async function fetchData() {
  try {
    setLoader()
    await getReq()
    render()
  } catch (error) {
    setError('Ошибка получения данных с сервера')
  } finally {
    deleteLoader()
  }

}


async function addTask() {
  const taskInput = document.querySelector("input").value.trim()
  if (!taskInput.length) {
    return setError('Некорректные данные')
  }

  document.querySelector('input').focus()
  document.querySelector('input').value = ''
  try {
    await createReq(taskInput)
    await getReq()
    render()
  } catch (error) {
    setError('Ошибка получения данных с сервера')
  }
}

async function deleteElem(id) {
  try {
    await deleteReq(id)
    await getReq()
    render()
  } catch (error) {
    setError('Ошибка получения данных с сервера')
  }
}


async function setEditedTask(i) {
  let text = document.getElementById(`change-${i}`).value
  if (!text) {
    text = taskArr[i].text
  }
  try {
    await patchReq(i, text)
    await getReq()
    render()
  } catch (error) {
    setError('Ошибка получения данных с сервера')
  }


}

async function setActive(i) {
  taskArr[i].isCheck = !taskArr[i].isCheck
  let text = taskArr[i].text
  try {
    await patchReq(i, text)
    await getReq()
    render()
  } catch (error) {
    setError('Ошибка получения данных с сервера')
  }


}

function setEdit(i) {
  render()
  document.getElementById(`task-${i}`).classList.toggle('hidden')
  document.getElementById(`edit-${i}`).classList.toggle('active')
}

function setError(str) {
  if (!document.querySelector('.error')) {
    const errorDiv = document.createElement('div')
    errorDiv.classList.add('error')
    tasks.before(errorDiv)
    const errorText = document.createElement('span')
    errorText.innerText = str
    errorDiv.appendChild(errorText)
    setTimeout(() => errorDiv.remove(), 5000)
  }

}

function setLoader() {
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

function deleteLoader() {
  document.getElementById('ring').remove()
}

function render() {
  const tasks = document.querySelector('#tasks')
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
    inputEdit.classList.add('edit_text')
    editDiv.appendChild(inputEdit)

    const operatorsDiv = document.createElement('div')
    operatorsDiv.classList.add('operators')
    editDiv.appendChild(operatorsDiv)

    const saveButton = document.createElement('button')
    saveButton.addEventListener('click', async () => await setEditedTask(i))
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

    const inputCheck = document.createElement('input')
    inputCheck.type = 'checkbox'
    inputCheck.addEventListener('click', () => setActive(i))
    el.isCheck ? inputCheck.checked = true : inputCheck.checked = false
    inputCheck.classList.add('checkbox')
    taskDiv.prepend(inputCheck)

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