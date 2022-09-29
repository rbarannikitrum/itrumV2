// Напишите функцию removeDuplicates(arr), которая возвращает массив,
// в котором удалены повторяющиеся элементы из массива arr (игнорируйте чувствительность к регистру).
function removeDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {
        let counter = 0
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                counter++
                if (counter > 1) {
                    arr.splice(j, 1)
                }
            }
        }
    }
    return arr
}


console.log(removeDuplicates([4, 7, 1, 9, 6, 8, 4, 6, 3, 6]))
