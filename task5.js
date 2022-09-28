// Дана строка. Разделите строку на фрагменты по три подряд идущих символа. В каждом фрагменте средний символ заменить на случайный символ,
// не совпадающий ни с одним из символов этого фрагмента, например, нижнее подчеркивание (_). Показать фрагменты, упорядоченные по алфавиту.

function stringByThree(str) {
    const arr = str.split('')
    const joinArr = []
    const result = []
    for (let i = 1; i < arr.length; i = i + 3) {
        arr[i] = '_'
    }
    for (let i = 0; i < arr.length; i = i + 3) {
        joinArr.push([arr[i], arr[i + 1], arr[i + 2]])

    }
    for (let j = joinArr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (joinArr[i] > joinArr[i + 1]) {
                let temp = joinArr[i];
                joinArr[i] = joinArr[i + 1];
                joinArr[i + 1] = temp;
            }
        }
    }
    for (let i = 0; i < joinArr.length; i++) {
        result.push(joinArr[i].join(''))
    }

    return result
}

console.log(stringByThree("test education part 2"))