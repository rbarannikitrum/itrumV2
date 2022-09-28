// Напишите функцию, которая добавит в первый массив только те значения, которые присутствуют во втором, но нет в первом
function addArray(arr1, arr2) {
    const diffArr = []
    for (let i = 0; i < arr2.length; i++) {
        let isDuplicate = false
        for (let j = 0; j < arr1.length; j++) {
            if (arr2[i] === arr1[j]) {
                isDuplicate = true
                break
            }
        }
        if (!isDuplicate) {
            diffArr.push(arr2[i])
        }
    }
    for (let i = 0; i < diffArr.length; i++) {
        arr1.push(diffArr[i])
    }

    return arr1
}
console.log(addArray([5, 8, -3, 7, 3, 7, 3, 8, 9, 2, 8, -2], [8, 5, 7, -3, 6, 3, 1, 4, 2]))