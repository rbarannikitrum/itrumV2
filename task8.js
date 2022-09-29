// Реализовать функцию, которая отсортирует коллекцию по конкретному свойству объекта и переданному параметру (asc, desc). Если параметр (asc, desc)
// не передан, по умолчанию сортировка asc.
// asc - это сортировка по возрастанию, desc -  сортировка по убыванию.
// func (arr, "age", asc);
function sortByParam(arr, param, direction) {

    if (direction === 'desc') {
        for (let j = arr.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (arr[i][param] < arr[i + 1][param]) {
                    const temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }
        }
    } else {
        for (let j = arr.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (arr[i][param] > arr[i + 1][param]) {
                    const temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }
        }
    }

    return arr
}

console.log(sortByParam([

        {name: 1, age: 34, country: "RF"},

        {name: 3, age: 12, country: "RF"},

        {name: 2, age: 54, country: "RF"}

    ], 'name', 'desc'
))