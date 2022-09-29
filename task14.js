// Реализуйте функцию, котора параметром принимает строку. Выведите сформированный объект из параметров строки браузера.
function browserParams(str) {
    const result = {}
    const afterDomain = str.split('?')[1].split('&')
    afterDomain.forEach(el => {
        el = el.split('=')
        const key = el[0]
        const value = el[1]
        result[key] = value
    })

    return result
}

console.log(browserParams("https://underscorejs.org?id=123&limit=5&offset=0"))