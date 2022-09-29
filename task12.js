// Реализуйте функцию, которая принимает на вход объект типа { "dog": 6, "cat": 11 } и возвращает массив пар.

function pair(obj) {
    const arr = []
    for (const key in obj) {
        arr.push([key, obj[key]])
    }

    return arr
}

console.log(pair({"dog": 6, "cat": 11}))