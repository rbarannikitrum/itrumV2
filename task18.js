// Написать функцию, принимающую на вход ФИО в виде одной строки.
// Функция должна возвращать объект вида { first_name: “Имя”, last_name: “Фамилия”, patronymic_name: “Отчество”}

function names(str) {
    const split = str.split(' ', 3)

    return {
        first_name: split[1],
        last_name: split[0],
        patronymic_name: split[2]
    }
}

console.log(names('Иванов Пётр Андреевич'))