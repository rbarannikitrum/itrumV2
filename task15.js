// Написать функцию фильтрации коллекции, где у объекта есть свойство с конкретным значением.
function filterObj(arr, type, value) {
    const result = []
    arr.forEach(el => {
        if (el[type] === value) {
            result.push(el)
        }
    })
    return result
}

console.log(filterObj([

    {name: "test", age: 45, country: "RF", tel: "+79846466744"},

    {name: "test1", age: 23, country: "RF", tel: "+79464747484"},

    {name: "test2", age: 18, country: "RF", tel: "+376483876346"}

], 'age', 23))