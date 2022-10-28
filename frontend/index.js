let where = ''
let editInput = ''
let howMany = 0
let total = 0
let spendArr = []
const spends = document.querySelector('#all_spends')
let editWhereInput = ''
let editPriceInput = ''
let editTimeInput = ''

// получить инпут в случае когда открывается 3 инпута
function getInputForAll(i) {
  editWhereInput = document.querySelector(`#edit_place_input-${i}`).value.trim()
  editPriceInput = document.querySelector(`#edit_price_input-${i}`).value.trim()
  editTimeInput = document.querySelector(`#edit_time_input-${i}`).value
  if (editPriceInput <= 0) {
    editPriceInput = 0
  }
}


// сохранить изменения в случае когда открывается 3 инпута
async function saveChangesForAll(i) {
  getInputForAll(i)
  if (editPriceInput === 0) {
    return
  }
  if (editWhereInput === '') {
    return
  }
  if (editWhereInput || editPriceInput) {
    spendArr = await fetch('http://localhost:8000/updateSpend', {
      method: 'PATCH',
      body: JSON.stringify({_id: spendArr[i]._id, place: editWhereInput, time: editTimeInput, price: editPriceInput}),
      headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
    }).then(res => res.json())
    await fetchData()
  } else render()
}

// получение задачек
async function fetchData() {
  setLoader()
  spendArr = await fetch('http://localhost:8000/allSpends',
      {
        method: 'GET', headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
      }).then(res => res.json())
  deleteLoader()
  render()
}

// инпут места для добавления новой задачи
function inputWhere() {
  where = document.querySelector('#where').value.trim()
}

// инпут цены для добавления новой задачи
function inputHowMany() {
  howMany = document.querySelector('#how_many').value.trim()
  if (howMany <= 0) {
    howMany = 0
  }
}


// добавить задачу
async function addSpend() {
  if (where && howMany) {
    if (where === '') {
      return
    }
    if (!howMany) {
      return
    }
    document.querySelector('#where').value = ''
    document.querySelector('#how_many').value = ''
    setLoader()
    await fetch('http://localhost:8000/createSpend', {
      method: 'POST',
      body: JSON.stringify({place: where, price: howMany}),
      headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
    }).then(res => res.json()).then(res => res.data)
    deleteLoader()
    howMany = Number(howMany)
    await fetchData()
  }
}

// удалить задачу
async function deleteElement(i) {
  setLoader()
  await fetch(`http://localhost:8000/deleteSpend?_id=${spendArr[i]._id}`, {method: 'DELETE'}).then(res => res.json()).then(res => res.data)
  deleteLoader()
  await fetchData()
}

// получить инпут когда открыто одно поле ввода
function getInput(elem, i) {
  editInput = document.querySelector(`#edit-${elem.split('-')[0]}-${i}`).value
  if (editInput <= 0) {
    editInput = 0
  }
}


// сохранить изменения когда открыто одно поле ввода
async function saveChanges(elem, i) {
  getInput(elem, i)
  if (editInput === 0) {
    return
  }
  const type = elem.split('-')[0]
  spendArr[i][type] = editInput
  setLoader()
  spendArr = await fetch('http://localhost:8000/updateSpend', {
    method: 'PATCH',
    body: JSON.stringify({
      _id: spendArr[i]._id,
      place: spendArr[i].place,
      time: spendArr[i].time,
      price: spendArr[i].price
    }),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json())
  deleteLoader()
  await fetchData()
  render()
}

// открыть окно редактирования с одним полем ввода
function setEdit(elem, i) {
  render()
  const field = document.querySelector(`#${elem}`)
  const task = field.parentNode
  task.className = 'task';
  field.remove()
  const input = document.createElement('input')
  input.type = `${elem.split('-')[0] === 'price' ? 'number' : elem.split('-')[0] === 'time' ? 'date' : 'text'}`
  input.type === 'date' ? input.valueAsDate = new Date(spendArr[i][elem.split('-')[0]]) : input.value = `${spendArr[i][elem.split('-')[0]]}`
  input.classList.add('input_edit')
  input.id = `edit-${elem.split('-')[0]}-${i}`
  task.appendChild(input)
  task.addEventListener('focusout', () => render())

  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      saveChanges(elem, i)
    }
  })
}

// открыть окно редактирования с 3 полями ввода
function openEdit(i) {
  render()
  const task = document.querySelector(`#task-${i}`)
  task.innerHTML = ''


  const editPlaceInput = document.createElement('input')
  editPlaceInput.placeholder = 'Где'
  editPlaceInput.maxLength = 300
  editPlaceInput.id = `edit_place_input-${i}`
  editPlaceInput.value = spendArr[i].place
  editPlaceInput.classList.add('input_edit')
  task.appendChild(editPlaceInput)


  const editTimeInput = document.createElement('input')
  editTimeInput.id = `edit_time_input-${i}`
  editTimeInput.type = 'date'
  editTimeInput.valueAsDate = new Date(spendArr[i].time)
  editTimeInput.classList.add('input_edit')
  task.appendChild(editTimeInput)

  const editPriceInput = document.createElement('input')
  editPriceInput.placeholder = 'Потрачено'
  editPriceInput.id = `edit_price_input-${i}`
  editPriceInput.type = 'number'
  editPriceInput.classList.add('input_edit')
  editPriceInput.value = spendArr[i].price
  task.appendChild(editPriceInput)

  const saveButton = document.createElement('button')
  saveButton.innerText = 'Save'
  saveButton.classList.add('btn')
  saveButton.addEventListener('click', () => saveChangesForAll(i))
  task.appendChild(saveButton)

  const cancelButton = document.createElement('button')
  cancelButton.innerText = 'Cancel'
  cancelButton.classList.add('btn')
  cancelButton.addEventListener('click', () => render())
  task.appendChild(cancelButton)
}

// создал лоадер
function setLoader() {
  const ring = document.createElement('div')
  ring.id = 'ring'
  ring.classList.add('lds-ring')
  spends.before(ring)

  let firstDiv = document.createElement('div')
  ring.appendChild(firstDiv)

  let secondDiv = document.createElement('div')
  ring.appendChild(secondDiv)

  let thirdDiv = document.createElement('div')
  ring.appendChild(thirdDiv)

  let fourthDiv = document.createElement('div')
  ring.appendChild(fourthDiv)
}

// удалил лоадер
function deleteLoader() {
  let load = document.getElementById('ring')
  load.remove()
}

// рендер
function render() {

  total = spendArr.reduce((accum, el) => accum + el.price, 0)

  spends.innerHTML = ''
  const sum = document.createElement('div')
  sum.classList.add('sum')
  sum.innerText = `Всего денег потрачено было : ${total} рублей`


  spendArr.forEach((el, i) => {
    // вся задача
    const container = document.createElement('div')
    container.id = `task-${i}`
    container.classList.add('container_task')


    const placeContainer = document.createElement('div')
    placeContainer.classList.add('element')
    container.appendChild(placeContainer)


    const place = document.createElement('span')
    place.innerText = `${el.place}`
    place.addEventListener('click', () => setEdit(place.id, i))
    placeContainer.appendChild(place)
    place.id = `place-${i}`


    const timeContainer = document.createElement('div')
    timeContainer.classList.add('element')
    container.appendChild(timeContainer)


    const time = document.createElement('span')
    time.innerText = `${new Date(el.time).toLocaleDateString('ru-ru')}`
    timeContainer.appendChild(time)
    time.addEventListener('click', () => setEdit(time.id, i))
    time.id = `time-${i}`

    const priceContainer = document.createElement('div')
    container.appendChild(priceContainer)
    priceContainer.classList.add('element')


    const price = document.createElement('span')
    price.innerText = `${el.price} ₽`
    price.addEventListener('click', () => setEdit(price.id, i))
    priceContainer.appendChild(price)
    price.id = `price-${i}`


    const deleteEl = document.createElement('button')
    deleteEl.innerText = 'Delete'
    deleteEl.addEventListener('click', () => deleteElement(i))
    container.appendChild(deleteEl)
    deleteEl.classList.add('btn')
    deleteEl.id = `delete-${i}`

    const editTask = document.createElement('button')
    editTask.innerText = 'Edit'
    container.appendChild(editTask)
    editTask.classList.add('btn')
    editTask.classList.add('edit_btn')
    editTask.id = `edit-${i}`
    editTask.addEventListener('click', () => {
      openEdit(i)
    })

    // див со всеми задачами
    spends.appendChild(container)
    spends.appendChild(sum)
  })
}