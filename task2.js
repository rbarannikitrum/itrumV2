// Дана строка. Вывести первые три символа и последние три символа, если длина строки больше 5. Иначе вывести первый символ столько раз, какова длина строки.
function lengthCheck(str) {
    if (str.length > 5) {
        const beginStr = str.slice(0, 3)
        const endStr = str.slice(str.length - 3, str.length)
        str = beginStr + endStr
    } else {
        const firstLetter = str[0]
        const length = str.length
        str = ''
        for (let i = 0; i < length; i++) {
            str = str + firstLetter
        }
    }

    return str
}

console.log(lengthCheck("test"))