// Дано число. Сложите его цифры. Если сумма получилась более 9-ти, опять сложите его цифры.
// И так, пока сумма не станет однозначным числом (9 и менее).

function sumNumbers(num) {
    num = num.toString()
    const arrNum = num.split('')
    const sum = arrNum.reduce((accum, el) => accum + +el, 0)
    if (sum > 9) {
         return sumNumbers(sum)
    }
    return sum
}

console.log(sumNumbers(345))