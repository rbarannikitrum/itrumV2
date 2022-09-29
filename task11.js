// Написать функцию, которая возвращает отсортированный массив уникальных значений.

function sortUnique(arr) {
    let result = []
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
        if (arr[i] !== arr[i + 1] && arr[i] !== arr[i - 1]) {
            result.push(arr[i])
        }
    }

    return result
}

console.log(sortUnique([5, 2, 8, 4, 8, 2, 5, 8, 2, 17, 8, 4, 2, 4, 7, 3]))