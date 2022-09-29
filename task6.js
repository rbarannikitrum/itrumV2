// Напишите функцию, которая принимает параметром массив с объектами. Сгруппируйте объекты заказов по имени.
function summary(arr) {
    const resultArr = []
    for (let i = 0; i < arr.length; i++) {
        let number = 0
        const currentElement = arr[i]
        for (let j = i; j < arr.length; j++) {
            if (currentElement.name === arr[j].name) {
                number++
            }
        }
        if (number === 1) {
            for (let j = i - 1; j >= 0; j--) {
                if (currentElement.name === arr[j].name) {
                    currentElement.price += arr[j].price
                }
            }
            resultArr.push(currentElement)
        }

    }

    return resultArr
}

console.log(summary([

        {name: "test", price: 200},

        {name: "test1", price: 300},

        {name: "test", price: 100},

        {name: "test", price: 600}

    ]
))


