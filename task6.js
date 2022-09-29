// Напишите функцию, которая четное число возводит в квадрат, а нечетное - в куб. После умножает полученное значение на второй параметр.
// Затем прибавляет третий параметр и находит корень от получившегося результата, округленный до сотых. Но за счет того, что функция вызывает функцию.

function curry(first) {
    if (first % 2 === 0) {
        first = first ** 2
    } else first = first ** 3
    return (second) => {
        first = first * second

        return (third) => {
            first = (first + third) ** 0.5
            first = first.toFixed(2)

            return first
        }
    }

}

console.log(curry(17)(6)(2))
