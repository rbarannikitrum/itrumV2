// Имеется двумерный массив. Пользуясь возможностями ES6 синтаксиса объединить его в одномерный массив.

function flatFunc(array) {

    return array.flat()
}


console.log(flatFunc([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))