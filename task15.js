// Напишите функцию, которая заполнит массив следующим образом: в первый элемент запишите 'x', во второй 'xx',
// в третий 'xxx' и так далее. Функция параметром принимает длину массива.
function createSymbol(length) {
    const result = []
    let str = 'x'
    for (let i = 1; i < length + 1; i++) {
        result.push(str)
        str = str + 'x'
    }

    return result
}

console.log(createSymbol(7))
