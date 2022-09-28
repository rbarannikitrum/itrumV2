// Создайте функцию, которая параметром принимает объект. Функция умножает все числовые свойства объекта на 2.

function multipleNumber(obj) {
    for (const key in obj) {
        if (typeof (obj[key]) === 'number') {
            obj[key] = obj[key] * 2
        }
    }

    return obj
}

console.log(multipleNumber({name: "test", age: 25, weight: 65, height: 165}))