// Заполнить двумерный массив таблицей квадратов целых чисел от 0 до 100 и вывести её в удобочитаемом виде.

const result = []
for (let x = 0; x < 10; x ++) {
    const row = []
    for (let y = 0 ; y < 10; y ++) {
        row.push(`${x * 10 + y} ^ 2 = ${(x * 10 + y) ** 2}`)
    }
    result.push(row)
}
console.table(result)