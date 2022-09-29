// Даны две строки. Сравнить строки. Вывести символы большей строки, на количество которых отличается.

const str1 = 'text education part 2'
const str2 = 'text education'
let result = ''
if (str1.length > str2.length) {
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            result = result + str1[i]
        }
    }
}
if (str2.length > str1.length) {
    for (let i = 0; i < str2.length; i++) {
        if (str2[i] !== str1[i]) {
            result = result + str2[i]
        }
    }
}
console.log(result)