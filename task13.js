// Реализуйте функцию. На вход функция принимает массив значений из 0 и 1. Верните объект сгруппированных данных {"0": 10, "1": 5}
function countElements(arr) {
    const obj = {}
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = ((obj[arr[i]]) || 0) + 1
    }
    return obj
}

console.log(countElements([0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1]))