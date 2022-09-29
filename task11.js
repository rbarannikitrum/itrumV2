// Дана строка. Написать функцию, которая определит, содержит ли строка только символы 'a', 'b', 'c' или нет.
function checkSymbols(str) {
    let result = true
    if (!str) {
        return false
    }
    for (let i = 0; i < str.length; i++) {
        if (!(str[i] === 'a' || str[i] === 'b' || str[i] === 'c')) {
            result = false
            break
        }
    }

    return result
}

console.log(checkSymbols(""))