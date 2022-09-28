// Напишите функцию, которая возвращает true, если в массиве есть все значения, которые указаны во втором.
function checkArr(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length + 1; j++) {
            if (arr1[j] === arr2[i]) {
                break
            }
            if (j === arr1.length) {
                return false
            }
        }

    }
    return true
}

console.log(checkArr([4, 8, 1, 9, -3, 7, 2, 8, 4, -6, 8, 4, 6, 1, 9, -4, 3], [3, 7, -6]))