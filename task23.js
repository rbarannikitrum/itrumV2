// Имеется массив строк. Строки в массиве могут повторяться любое количество раз. Вывести уникальные строки и их количество в массиве.

function checkRepeat(arr) {
    const obj = {}
    arr.forEach((a) => {
        obj[a] = obj[a] + 1 || 1
    })

    return obj
}

console.log(checkRepeat(['aaa', 'bbb', 'ccc', 'aaa', 'bbb', '', 'aaa']))