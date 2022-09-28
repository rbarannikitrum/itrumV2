// Напишите функцию range(), принимающую два аргумента: начало и конец диапазона.
// Функция возвращает массив, который содержит все числа из диапазона, включая начальное и конечное.
// Третий необязательный аргумент функции range() – шаг для построения массива. Убедитесь, что функция range() работает с отрицательным шагом.

function range(start, end, step) {
    let arr = []
    if (start > end) {
        for (let i = start; i >= end; i = i + step) {
            arr.push(i)
        }
    } else if (start < end) {
        for (let i = start; i <= end; i = i + step) {
            arr.push(i)
        }
    }

    return arr
}

console.log(range(4, 16, 2))

