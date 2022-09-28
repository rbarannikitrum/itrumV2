// Написать функцию, принимающую число N, и возвращающую массив длиной N, заполненный числами Фибоначчи.
// Числа Фибоначчи - элементы числовой последовательности, в которой первые два числа равны 0 и 1,
// а каждое последующее число равно сумме двух предыдущих чисел (пример, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233).

function finbonacchi(num) {
    let firstNum = 0
    let secondNum = 1
    let arr = []
    if (num === 1) {
        return [0]
    }

    if (num === 2) {
        return [0, 1]
    }

    if (num > 2) {
        arr.push(firstNum, secondNum)
        for (let i = 0; i < num - 2; i++) {
            let thirdNum = secondNum + firstNum
            arr.push(thirdNum)
            firstNum = secondNum
            secondNum = thirdNum
        }
        return arr
    }
}

console.log(finbonacchi(4))