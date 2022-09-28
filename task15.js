// Написать функцию, принимающую на вход массив чисел, функцию фильтрации и функцию преобразования, которая фильтрует массив, преобразует данные, а затем выводит их.

function convert_array(arr, func1, func2) {

    return arr.filter(func1).map(func2)
}

console.log(convert_array([1, 2, 3, 4], (el) => el % 2 === 0, (el) => el * 2))