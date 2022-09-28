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
    let noRepeat = new Set()
   resultArr.forEach(el => {
       noRepeat.add(el)
   })
    return [...noRepeat]
}

console.log(findEverywhere([5, 2, 7, 3, 6, 8, 2, 9, 1, 4, 4], [4, 2, 9, 4, 5, 4]))