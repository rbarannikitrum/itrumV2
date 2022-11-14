// Напишите функцию, которая находит наиболее часто встречаемый элемент массива.
function getOften(arr) {
    const obj = {}
    let maxUsages = 0
    let value = 0
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = ((obj[arr[i]]) || 0) + 1
    }
    for (let objKey in obj) {
        if (obj[objKey] > maxUsages) {
            maxUsages = obj[objKey]
            value = objKey
        }
    }
    return value

}

console.log(getOften([6, 3, 8, 2, 6, 8, 2, 5, 7, 2, 6, 8, 6, 2, 6]))