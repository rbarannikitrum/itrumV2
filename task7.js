// Написать функцию, которая отфильтрует коллекцию, где у свойства есть хоть какое-то значение.
function checkEmpty(arr) {
    arr.forEach(el => {
        let nullCounter = 0
        for (const elKey in el) {
            if ((!el[elKey] === true)) {
                nullCounter += 1
            }
        }
        if (nullCounter === Object.keys(arr[0]).length) {
            arr.splice(arr.indexOf(el), 1)
        }

    })

    return arr
}

console.log(checkEmpty([

    {name: "test", age: 34, country: "RF"},

    {name: "", age: null, country: ""},

    {name: "test1", age: null, country: ""},

    {name: "", age: 12, country: ""},

    {name: "", age: null, country: "RF"}]
))

