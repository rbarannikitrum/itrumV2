// Заполнить двумерный массив таблицей умножения от 0 до 10 и вывести её в удобочитаемом виде.

const result = []
for (let x = 0; x < 11; x++) {
    const table = []
    for (let y = 0; y < 11; y++) {
        table.push(`${y} * ${x} = ${x * y}`)
    }
    result.push(table)
}
console.table(result)
