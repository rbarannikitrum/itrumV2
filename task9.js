// Написать функцию, которая принимает параметрами два массива. Вернуть массив тех значений, которые есть и в первом и во втором.
function findEverywhere(arr1, arr2) {
    const resultArr = []
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr2[j] === arr1[i]) {
                resultArr.push(arr2[j])
            }
        }
    }
    for (let j = resultArr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (resultArr[i] > resultArr[i + 1]) {
                const temp = resultArr[i];
                resultArr[i] = resultArr[i + 1];
                resultArr[i + 1] = temp;
            }
        }
    }
    for (let i = 0; i < resultArr.length; i++) {
        if (resultArr[i] === resultArr[i + 1]) {
            resultArr.splice(i + 1, 1)
        }
        if (resultArr[i] === resultArr[i - 1]) {
            resultArr.splice(i - 1, 1)
        }

    }

    return resultArr
}

console.log(findEverywhere([5, 2, 7, 3, 6, 8, 2, 9, 1, 4, 4], [4, 2, 9, 4, 5, 4]))