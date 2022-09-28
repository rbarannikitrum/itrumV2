// Имеется массив пользователей вида [{ name: “Ivan”, age: 24 }]. Вывести имена тех пользователей, возраст которых больше 18 лет.

function ageChecker(arr) {
    const border_age = 18
    arr.forEach(el => {
        if (el.age > border_age) {
            console.log(el.name)
        }
    })
}

ageChecker([{name: 'Ivan', age: 24}, {name: 'Oleg', age: 16}, {name: 'Igor', age: 24}])