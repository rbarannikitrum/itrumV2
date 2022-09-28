// Дана строка. Разделите строку на фрагменты по три подряд идущих символа. В каждом фрагменте средний символ заменить на случайный символ,
// не совпадающий ни с одним из символов этого фрагмента, например, нижнее подчеркивание (_). Показать фрагменты, упорядоченные по алфавиту.

function stringByThree(str) {
    const arr = str.split('')
    const join_arr = []
    const result = []
    for (let i = 1; i < arr.length; i = i + 3) {
        arr[i] = '_'
    }
    for (let i = 0; i < arr.length; i = i + 3) {
        join_arr.push([arr[i], arr[i + 1], arr[i + 2]])

    }
    for (let j = join_arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (join_arr[i] > join_arr[i + 1]) {
                let temp = join_arr[i];
                join_arr[i] = join_arr[i + 1];
                join_arr[i + 1] = temp;
            }
        }
    }
    for (let i = 0; i < join_arr.length; i++) {
        result.push(join_arr[i].join(''))
    }

    return result
}

console.log(stringByThree("test education part 2"))