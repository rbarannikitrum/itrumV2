// Написать функцию, которая принимает три параметра: массив array и два числа start и end.
// Функция должна возвращать массив фрагмент массива array, начиная с индекса start и заканчивая end.

function shortenArr(arr, start, end) {

    return arr.slice(start, end + 1)
}

console.log(shortenArr([13, 14, 32, 23, 34, 21, 44, 47, 86], 4, 6))