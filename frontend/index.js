let where = ''
let editWhereInput = ''
let editPriceInput = ''
let editTimeInput = ''

let howMany = 0
let spendArr = []
const spends = document.querySelector('#all_spends')

async function fetchData() {
  spendArr = await fetch('http://localhost:8000/allSpends',
      {
        method: 'GET', headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
      }).then(res => res.json())
  render()

}

function inputWhere () {
  where = document.querySelector('#where').value.trim()
}
function inputHowMany () {
  howMany = document.querySelector('#how_many').value.trim()
}
async function addSpend () {
  if (where && howMany) {
    await fetch('http://localhost:8000/createSpend', {
      method: 'POST',
      body: JSON.stringify({place : where, price : howMany}),
      headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
    }).then(res => res.json()).then(res => res.data)
    await fetchData()
  }
}
async function deleteElement (i) {
  await fetch(`http://localhost:8000/deleteSpend?_id=${spendArr[i]._id}`, {method: 'DELETE'}).then(res => res.json()).then(res => res.data)
  await fetchData()
}
function getInput (i) {
  editWhereInput = document.querySelector(`#edit_where_input-${i}`).value.trim()
  editPriceInput = document.querySelector(`#edit_price_input-${i}`).value.trim()
  editTimeInput = document.querySelector(`#edit_time_input-${i}`).value
  if (editPriceInput < 1) {
    editPriceInput = ''
  }


}
async function saveChanges (i) {
  getInput(i)
  if (editWhereInput || editPriceInput) {

    spendArr = await fetch('http://localhost:8000/updateSpend', {
      method: 'PATCH',
      body: JSON.stringify({_id: spendArr[i]._id, place: editWhereInput, time: editTimeInput, price : editPriceInput}),
      headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
    }).then(res => res.json())
    await fetchData()
  } else render()

}


function setEdit (i) {
  console.log(i)
  render()
  const task = document.querySelector(`#task-${i}`)
  task.innerHTML = ''


  const editPlaceInput = document.createElement('input')
  editPlaceInput.placeholder = 'Где'
  editPlaceInput.maxLength = 300
  editPlaceInput.id = `edit_place_input-${i}`
  editPlaceInput.value = spendArr[i].place
  task.appendChild(editPlaceInput)


  const editTimeInput = document.createElement('input')
  editTimeInput.id = `edit_time_input-${i}`
  editTimeInput.type = 'date'
  task.appendChild(editTimeInput)


  const editPriceInput = document.createElement('input')
  editPriceInput.placeholder = 'Потрачено'
  editPriceInput.id = `edit_price_input-${i}`
  editPriceInput.type = 'number'
  editPriceInput.value = spendArr[i].price
  task.appendChild(editPriceInput)


  const saveButton = document.createElement('button')
  saveButton.innerText = 'save'
  saveButton.addEventListener('click', () => saveChanges(i))
  task.appendChild(saveButton)


  const cancelButton = document.createElement('button')
  cancelButton.innerText = 'cancel'
  cancelButton.addEventListener('click', () => render())
  task.appendChild(cancelButton)
}


function render () {
  spends.innerHTML = ''
  spendArr.forEach((el, i) => {
    const container = document.createElement('div')
    container.id = `task-${i}`
    container.classList.add('container_task')

    const taskContainer = document.createElement('div')
    container.appendChild(taskContainer)

    const place = document.createElement('div')
    place.innerText = `${el.place}`
    place.onclick = () => {setEdit(place.id)}
    taskContainer.appendChild(place)
    place.id = `place-${i}`

    const date = document.createElement('div')
    date.innerText =`${new Date(el.time).toLocaleDateString('ru-ru')}`
    taskContainer.appendChild(date)
    date.id = `date-${i}`

    const price = document.createElement('div')
    price.innerText = `${el.price}`
    taskContainer.appendChild(price)
    price.id = `price-${i}`

    const operators = document.createElement('div')
    container.appendChild(operators)

    const edit = document.createElement('button')
    edit.innerText = 'edit'
    edit.id = `edit-${i}`
    operators.appendChild(edit)
    edit.addEventListener('click', () => {setEdit(i)})



    const deleteEl = document.createElement('button')
    deleteEl.innerText = 'delete'
    deleteEl.addEventListener('click',() => deleteElement(i))
    operators.appendChild(deleteEl)
    deleteEl.id = `delete-${i}`



    spends.appendChild(container)

  })
}