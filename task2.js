// Дано число, например 31. Проверьте, что это число не делится ни на одно другое число кроме себя самого и единицы.
// То есть в нашем случае нужно проверить, что число 31 не делится на все числа от 2 до 30. Если число не делится - выведите 'false', а если делится - выведите 'true'.
function simpleNumber(num) {
    let isDivided = false
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            isDivided = true
        }
    }

    return isDivided
}

console.log(simpleNumber(4))