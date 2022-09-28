// Напишите функцию, которая удалит из первого массива все значения, которые указаны во втором массиве.
function deleteElements(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if (arr2[i] === arr1[j]) {
                arr1.splice(j, 1)
            }
        }
    }
    return arr1
}

console.log(deleteElements([5, 7, 2, -1, 7, 8, 3, 6, 2, 9, 4, -7], [2, -1, 9]))

