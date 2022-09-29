// Вернуть массив тех значений, которые есть в первом, но нет во втором.

function arrayDifference(arr1, arr2) {
    const resultArr = []
    for (let i = 0; i < arr1.length; i++) {
        let isDuplicate = false
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                isDuplicate = true
            }
        }
        if (!isDuplicate) {
            resultArr.push(arr1[i])
        }
    }

    return resultArr
}

console.log(arrayDifference([4, 7, 2, 9, 3, 5, 6, 4, 5, 1, 4], [4, 5, 6, 7, 8]))