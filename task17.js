// В функцию подается несколько массивов. Вернуть один массив со всеми элементами.

function result(arr) {

    return arr.flat(Infinity)
}

console.log(result([[2, 4, 6], [7, 16, 39123], ['a', 'b', 'c', 'd']]))