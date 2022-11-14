// Написать функцию, принимающую массив строк и выводящих их на экран, используя цикл while. Элементы из массива извлекать с помощью оператора .pop()

function displayNum(arr) {
    while (arr.length) {
        const str = arr.pop()
        console.log(str)
    }
}

displayNum(['1', '2', '3', '4', '5', '6', '7', '8', '9'])