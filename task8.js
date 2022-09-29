// Удалить из массива значения, индексы которых указаны во втором массиве.

function deleteIndex(arr, deleteArr) {

    for (let j = deleteArr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (deleteArr[i] < deleteArr[i + 1]) {
                let temp = deleteArr[i];
                deleteArr[i] = deleteArr[i + 1];
                deleteArr[i + 1] = temp;
            }
        }
    }
    for (let i = 0; i < deleteArr.length; i++) {
        arr.splice(deleteArr[i], 1)
    }

    return arr
}

console.log(deleteIndex([5, 2, 8, 6, 1, 9, 3, 6, 3, 7, 1], [2, 5, 1]))