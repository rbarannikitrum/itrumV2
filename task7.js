// Дана строка. Нужно написать функцию, которая возвращает значение true, если строка является палиндромом, или false если нет.

function palyndromeCheck(str) {
    let palyndrome = false
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] === str[str.length - i - 1]) {
            palyndrome = true
        } else {
            palyndrome = false
            break
        }
    }
return palyndrome
}

console.log(palyndromeCheck('12321'))