// Имеется массив пользователей вида [{ name: “Ivan”, age: 24 }]. Вывести суммарный возраст всех пользователей.

function calcAge(arr) {
    let result = 0
    arr.map(el => result = result + el.age)

    return result
}

console.log(calcAge([{name: 'Ivan', age: 24}, {name: 'Oleg', age: 16}, {name: 'Igor', age: 24}]))