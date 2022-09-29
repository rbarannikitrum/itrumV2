// Напишите функцию, которая преобразует массив вида let arr = [ { name: 'width', value: 300 }, { name: 'height', value: 100 } ];
// в объект let obj = { width: 300, height: 100 }; Количество объектов в массиве неограниченно.
function groupObj(arr) {
    const result = {}
    arr.forEach(el => {
        for (const elKey in el) {
            const newKey = el.name
            const newValue = el.value
            result[newKey] = newValue
        }
    })

    return result
}

console.log(groupObj([

    {name: "width", value: 300},

    {name: "height", value: 100}

]))