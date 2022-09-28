// Напишите функцию removeDuplicates(arr), которая возвращает массив,
// в котором удалены повторяющиеся элементы из массива arr (игнорируйте чувствительность к регистру).

function removeDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof (arr[i]) === 'string') {
            arr[i] = arr[i].toLowerCase()
        }
    }
    for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
            arr.splice(i + 1, 1)
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
            arr.splice(i - 1, 1)
        }
    }

    return arr
}

console.log(removeDuplicates([4, 7, 1, 9, 6, 8, 4, 6, 3, 6]))
