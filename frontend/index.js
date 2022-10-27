let where = ''
let editInput = ''

let howMany = 0
let spendArr = []
const spends = document.querySelector('#all_spends')

async function fetchData() {
  spendArr = await fetch('http://localhost:8000/allSpends',
      {
        method: 'GET', headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
      }).then(res => res.json())
  render()
  console.log(spendArr)

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

function getInput (elem, i) {
  editInput = document.querySelector(`#edit-${elem.split('-')[0]}-${i}`).value

}
async function saveChanges (elem, i) {
  getInput(elem, i)
  console.log(editInput, elem, spendArr[i].time)
  const type = elem.split('-')[0]
  spendArr[i][type] = editInput
    spendArr = await fetch('http://localhost:8000/updateSpend', {
      method: 'PATCH',
      body: JSON.stringify({_id: spendArr[i]._id, place : spendArr[i].place, time : spendArr[i].time, price : spendArr[i].price}),
      headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
    }).then(res => res.json())
    await fetchData()
   render()

}


function setEdit (elem, i) {
  console.log(elem, i)
  render()
  const field = document.querySelector(`#${elem}`)
  const task = field.parentNode
  task.className = 'task';
  field.remove()
  const input = document.createElement('input')
  input.type = `${elem.split('-')[0] === 'price' ? 'number' : elem.split('-')[0] === 'time' ? 'date' : 'text'}`
  input.type === 'date' ? input.valueAsDate = new Date(spendArr[i][elem.split('-')[0]]) : input.value = `${spendArr[i][elem.split('-')[0]]}`
  input.id = `edit-${elem.split('-')[0]}-${i}`
  input.onblur = () => {
    saveChanges(elem, i)
  }
  task.appendChild(input)

  const cancel = document.createElement('button')
  cancel.addEventListener('click', () => {render()})
  cancel.classList.add('cancel')
  task.appendChild(cancel)


}


function render () {
  spends.innerHTML = ''
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
    time.innerText =` ${new Date(el.time).toLocaleDateString('ru-ru')}  `
    timeContainer.appendChild(time)
    time.addEventListener('click', () => setEdit(time.id, i))
    time.id = `time-${i}`

    const priceContainer = document.createElement('div')
    container.appendChild(priceContainer)
    priceContainer.classList.add('element')



    const price = document.createElement('span')
    price.innerText = `${el.price}`
    price.addEventListener('click', () => setEdit(price.id, i))
    priceContainer.appendChild(price)
    price.id = `price-${i}`



    const deleteEl = document.createElement('button')
    deleteEl.innerText = 'Delete'
    deleteEl.addEventListener('click',() => deleteElement(i))
    container.appendChild(deleteEl)
    deleteEl.classList.add('delete')
    deleteEl.id = `delete-${i}`


    // див со всеми задачами
    spends.appendChild(container)

  })
}