// Написать функцию, которая отсортирует массив чисел по возрастанию (asc) или убыванию (desc).
function sortElements(arr, direction) {
    if (direction === 'asc') {
        for (let j = arr.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (arr[i] > arr[i + 1]) {
                    const temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }
        }
    }
    if (direction === 'desc') {
        for (let j = arr.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (arr[i] < arr[i + 1]) {
                    const temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }
        }
    }

    return arr
}

console.log(sortElements([6, 43, -6, 3, 0, 5, 2, 7], 'desc'))