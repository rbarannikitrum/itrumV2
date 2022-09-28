// Имеется массив пользователей вида [{ name: “Ivan”, age: 24 }].
// Рассчитать минимальный и максимальный возраст всех пользователей. Результат записать в объект вида { min: …, max: … }

function minMax(arr) {
    const ages = []
    arr.map(el => ages.push(el.age))
    ages.sort()

    return {min: ages[0], max: ages[ages.length - 1]}

}

console.log(minMax([{name: 'Ivan', age: 24}, {name: 'Oleg', age: 16}, {name: 'Igor', age: 24}]))