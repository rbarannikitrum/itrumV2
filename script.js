let taskInput
let taskArr = []
let text



function getTask() {

  taskInput = document.querySelector("input").value
}

function getEdit() {
  text = document.getElementById('change').value
}

function setEditedTask(i) {
  if (!text) {
    text = taskArr[i].text
  }
  taskArr[i].text = text
  taskArr[i].edit = !taskArr[i].edit
  render()
}

function addTask() {
  if (!taskInput.length) {
    return
  }
  if (!taskInput.trim()) {
    return
  }
  taskInput = taskInput.trim()
  taskArr.push({text: taskInput, completed: false})
  render()
  document.querySelector('input').focus()
  document.querySelector('input').value = ''
}

function deleteElem(i) {
  taskArr.splice(i, 1)
  render()
}

function setActive(i) {
  taskArr[i].completed = !taskArr[i].completed
  render()
}
function setEdit (i) {
  render()
  document.getElementById(`task-${i}`).classList.toggle('hidden')
  document.getElementById(`edit-${i}`).classList.toggle('active')
}


function render() {
  let elem = ''
  taskArr = taskArr.sort((a, b) => a.completed - b.completed)
  taskArr.forEach((el, i) => {
    elem += `<div class="edit hidden" id = 'edit-${i}' >
<input id = 'change' type="text" value="${taskArr[i].text}" onchange="getEdit()" class="edit_text"/>
<div class="operators">
<button onclick="setEditedTask(${i})">Save</button>
<button onclick="render()">Cancel</button>
</div>

</div>
<div id = 'task-${i}' class="task">
<div class="task_text">
<p style="${el.completed ? 'text-decoration : line-through' : ''}">${i+1}.${el.text}</p>
</div>
<div class="operators">

<input type="checkbox" onclick="setActive(${i})" ${el.completed ? 'checked' : ''} style="width: 20px; height: 20px;">


<button style=" ${el.completed ? 'display : none' : ''}" onclick="setEdit(${i})">Edit</button>
<button onclick="deleteElem(${i})">Delete</button></div>
</div>

`

  })
  document.querySelector('#tasks').innerHTML = elem
}