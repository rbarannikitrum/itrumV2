let total = 0
let spendArr = []
const spends = document.querySelector('#all_spends')
const serverError = 'Ошибка в получении данных с сервера'
const userError = 'Введите корректные данные'
const headers = {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}

async function getReq() {
    spendArr = await fetch('http://localhost:8000/allSpends',
        {
            method: 'GET'
        }).then(res => res.json())
}

async function createReq(where, howMany) {
    await fetch('http://localhost:8000/create', {
        method: 'POST',
        body: JSON.stringify({place: where, price: howMany}),
        headers
    }).then(res => res.json()).then(res => res.data)
}

async function patchReq (i) {
    await fetch('http://localhost:8000/update', {
        method: 'PATCH',
        body: JSON.stringify({
            _id: spendArr[i]._id,
            place: spendArr[i].place,
            time: spendArr[i].time,
            price: spendArr[i].price,
            permanentTime : spendArr[i].permanentTime
        }),
        headers
    }).then(res => res.json())
}

async function deleteReq (id) {
    await fetch(`http://localhost:8000/delete?_id=${id}`, {method: 'DELETE'}).then(res => res.json()).then(res => res.data)
}

// получение задачек
async function fetchData() {
    try {
        setLoader()
        await getReq()
        render()
    } catch (error) {
        setError(serverError)
    } finally {
        deleteLoader()
    }
}

// добавить задачу
async function addSpend() {
    let howMany = Number(document.querySelector('#howMany').value).toFixed(2)
    let where = document.querySelector('#where').value.trim()
    if (!where || !howMany || howMany > 9999999 || howMany <= 0) {
        return setError(userError)
    }
    try {
        await createReq(where, howMany)
        await getReq()
        render()
    } catch (error) {
        setError(serverError)
    }
    document.querySelector('#where').value = ''
    document.querySelector('#howMany').value = ''
}

// добавление задачи на enter
async function setEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        await addSpend()
    }
}
document.addEventListener('keyup', setEnter)

// сохранить изменения в случае когда открывается 3 инпута
async function saveChangesForAll(i) {
    let editWhereInput = document.querySelector(`#edit_place_input-${i}`).value.trim()
    let editPriceInput = Number(document.querySelector(`#edit_price_input-${i}`).value).toFixed(2)
    let editTimeInput = document.querySelector(`#edit_time_input-${i}`).value
    if (editPriceInput <= 0 ||
        editPriceInput > 9999999 ||
        editWhereInput === '' ||
        Math.abs(new Date(editTimeInput) - new Date(spendArr[i].permanentTime)) / (60 * 60 * 24 * 1000) > 7)
    {
        return setError(userError)
    }

    if (editWhereInput || editPriceInput) {
        try {
            spendArr[i].place = editWhereInput
            spendArr[i].time = editTimeInput
            spendArr[i].price = editPriceInput
            await patchReq(i)
            await getReq()
            render()
        } catch (error) {
            setError(serverError)
        }
    } else render()
}

// получить инпут когда открыто одно поле ввода
function getInput(elem, i) {
    let editInput = document.querySelector(`#edit-${elem.split('-')[0]}-${i}`).value
    if (elem.split('-')[0] === 'price') {
        editInput = Number(editInput).toFixed(2)
    }
    if (editInput <= 0) {
        setError(userError)
    }
    return editInput
}


// сохранить изменения когда открыто одно поле ввода
async function saveChanges(elem, i) {
    const editInput = getInput(elem, i)
    if (Number (editInput) === 0 || Number(editInput) > 9999999) {
        return setError(userError)
    }
    if (elem.split('-')[0] && Math.abs(new Date(editInput) - new Date(spendArr[i].permanentTime)) / (60 * 60 * 24 * 1000) > 7) {
        return setError(userError)
    }
    const type = elem.split('-')[0]
    spendArr[i][type] = editInput
    try {
        await patchReq(i)
        await getReq()
        render()
        render()
    } catch (error) {
        setError(serverError)
    }
}

// удалить задачу
async function deleteElement(id) {
    try {
        await deleteReq(id)
        await getReq()
        render()
    } catch (error) {
        setError(serverError)
    }
}

// открыть окно редактирования с одним полем ввода
function setEdit(elem) {
    const inputType = elem.split('-')[0]
    const i = elem.split('-')[1]
    document.removeEventListener('keyup', setEnter)
    render()
    const field = document.querySelector(`#${elem}`)
    const task = field.parentNode
    task.className = 'task';
    field.remove()
    const input = document.createElement('input')
    if (inputType === 'price') {
        input.type = 'number'
    } else if (inputType === 'time') {
        input.type = 'date'
    } else {
        input.type = 'text'
    }

    if (input.type === 'date') {
        input.valueAsDate = new Date(spendArr[i][inputType])
    } else input.value = spendArr[i][inputType]
    input.classList.add('input_edit')
    input.id = `edit-${inputType}-${i}`
    task.appendChild(input)
    task.addEventListener('focusout', () => render())

    input.addEventListener('keyup', async (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            await saveChanges(elem, i)
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
    saveButton.textContent = 'Сохранить'
    saveButton.classList.add('btn')
    saveButton.addEventListener('click', () => saveChangesForAll(i))
    task.appendChild(saveButton)

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Отмена'
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
    document.getElementById('ring').remove()
}

function setError(error) {
    if (!document.querySelector('.error')) {
        const errorDiv = document.createElement('div')
        errorDiv.classList.add('error')
        const errorText = document.createElement('span')
        errorText.textContent = error
        errorDiv.appendChild(errorText)
        spends.prepend(errorDiv)
        setTimeout(() => {
            errorDiv.remove()
        }, 5000)
    }

}

function reduceTotal() {
    total = spendArr.reduce((accum, el) => accum + el.price, 0)
}

// рендер
function render() {
    spends.innerHTML = ''
    const sum = document.createElement('div')
    sum.classList.add('sum')
    reduceTotal()
    sum.textContent = `Всего денег потрачено было : ${total} рублей`


    spendArr.forEach((el, i) => {
        // вся задача
        const container = document.createElement('div')
        container.id = `task-${i}`
        container.classList.add('container_task')


        const placeContainer = document.createElement('div')
        placeContainer.classList.add('element')
        container.appendChild(placeContainer)


        const place = document.createElement('span')
        place.textContent = `${el.place}`
        place.addEventListener('click', () => setEdit(place.id))
        placeContainer.appendChild(place)
        place.id = `place-${i}`


        const timeContainer = document.createElement('div')
        timeContainer.classList.add('element')
        container.appendChild(timeContainer)


        const time = document.createElement('span')
        time.textContent = `${new Date(el.time).toLocaleDateString('ru-ru')}`
        timeContainer.appendChild(time)
        time.addEventListener('click', () => setEdit(time.id))
        time.id = `time-${i}`

        const priceContainer = document.createElement('div')
        container.appendChild(priceContainer)
        priceContainer.classList.add('element')


        const price = document.createElement('span')
        price.textContent = `${el.price} ₽`
        price.addEventListener('click', () => setEdit(price.id))
        priceContainer.appendChild(price)
        price.id = `price-${i}`


        const deleteEl = document.createElement('button')
        deleteEl.textContent = 'Удалить'
        deleteEl.addEventListener('click', async () => {
            await deleteElement(el._id)
        })
        container.appendChild(deleteEl)
        deleteEl.classList.add('btn')
        deleteEl.id = `delete-${i}`

        const editTask = document.createElement('button')
        editTask.textContent = 'Изменить'
        container.appendChild(editTask)
        editTask.classList.add('btn')
        editTask.classList.add('edit_btn')
        editTask.id = `edit-${i}`
        editTask.addEventListener('click', (event) => {
            event.stopPropagation()
            openEdit(i)
        })

        // див со всеми задачами
        spends.appendChild(container)
        spends.appendChild(sum)
    })
}
