// Отфильтровать коллекцию по нескольким полям. Функция параметрами принимает массив,
// первое значение - поле с которым равно, второе значение, больше которого другое поле.
// Например, в коллекции мне нужно вывести значения, в которых возраст больше 18, а страна 'RF'.

function sortObject(array, country, age) {
    const result = []
    array.forEach(el => {
        if (el.country === country && el.age > age) {
            result.push(el)
        }

    })

    return result
}

const array = [

    {name: "test", age: 34, country: "RF"},

    {name: "test2", age: 12, country: "RF"},

    {name: "test1", age: 54, country: "RF"}

];

console.log(sortObject(array, "RF", 18))