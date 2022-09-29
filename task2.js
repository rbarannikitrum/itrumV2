// В функцию передается несколько массивов. Из первого массива, переданного в функцию,
// вывести элементы, которые имеются во всех других массивах, переданных в функцию.

function checkArr(...arr) {
    const baseArr = arr[0]
    const resultArr = []
    for (let i = 0; i < baseArr.length; i++) {
        const currentElement = baseArr[i];
        let isEverywhere = true
        for (let j = 1; j < arr.length; j++) {
            const iteratingArr = arr[j]
            let isHere = false
            for (let k = 0; k < iteratingArr.length; k++) {
                if (currentElement === iteratingArr[k]) {
                    isHere = true
                }

            }
            isEverywhere = isEverywhere && isHere
        }
        if (isEverywhere) {
            let isHere = false
            for (let j = 0; j < resultArr.length; j++) {
                if (resultArr[j] === currentElement) {
                    isHere = true
                }
            }
            if (!isHere) {
                resultArr.push(currentElement)
            }
        }
    }

    return resultArr
}

console.log(checkArr([3, 6, 1, 8, 3, 6, 3, 6, 3, 6, 8], [1, 4, 2, 4, 8, 8], [6, 3, 2, 8, 8, 1]))