// Напишите функцию, которая возвращает рандомный элемент из массива.
function randElem(arr) {

    return arr[Math.floor(Math.random() * arr.length)]
}

console.log(randElem([1, 2]))