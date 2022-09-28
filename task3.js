// Функция принимает в качестве параметра строку. Если она начинается на 'abc', то заменить их на 'www', иначе добавить в конец строки 'zzz'.
function addSymbol(str) {
    if (str[0] === 'a' && str[1] === 'b' && str[2] === 'c') {
        str = str.slice(3, str.length)
        str = 'www' + str
    } else {
        str = str + 'zzz'
    }

    return str
}

console.log(addSymbol("testabctext"))