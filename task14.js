// Написать функцию, принимающую два числа и любую операцию над этими числами (сложение, вычитание или др.). В функции выполнить эту операцию и вернуть результат.

function result(num1, num2, operator) {
    switch (operator) {
        case '+' :

            return num1 + num2
        case '-' :

            return num1 - num2
        case '*' :

            return num1 * num2
        case "/" :

            return num1 / num2
        case '%' :

            return num1 % num2
        case '**' :

            return num1 ** num2
    }
}

console.log(result(2, 3, '%'))