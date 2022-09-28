// Даны две строки. Напишите функцию, которая определит, содержится ли меньшая по длине строка в большей.

function checkString(str1, str2) {
    let bigStr = ''
    let smallStr = ''
    if (str1.length >= str2.length) {
        bigStr = str1
        smallStr = str2
    }
    if (str2.length > str1.length) {
        bigStr = str2
        smallStr = str1
    }

    for (let i = 0; i < bigStr.length - smallStr.length; i++) {

        if (bigStr[i] === smallStr[0] && bigStr[i + str2.length - 1] === smallStr[smallStr.length - 1]) {
            let newStr = bigStr.slice(i, i + str2.length)
            if (newStr === str2) {

                return true
            }
        }
    }

    return false

}

console.log(checkString("text education part 2", "text"))