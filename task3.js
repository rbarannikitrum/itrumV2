// На вход подается массив со значениями. Нужно вывести массив уникальных элементов (нет повторений в поданном массиве).
function unique(arr) {
    const result = []
    for (let i = 0; i < arr.length; i++) {
        let flag = 0
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                flag++
            }
        }
        if (flag === 1) {
            result.push(arr[i])
        }
    }

    return result
}

console.log(unique([5, 7, 6, 2, 8, 3, 5, 6, 2, 98, 13]))