// Реализуйте функцию, которая параметрами принимает два объекта и возвращает сообщение равны ли эти два объекта.

function includes(a, b) {
    for (let key in a) {
        try {
            if ((a[key] !== b[key])) {

                return false
            }
        } catch {

            return false
        }
    }
    return true
}

function equals(a, b) {

    return includes(a, b) && includes(b, a)
}

const a = {test: 8, text: 9};

const b = {test: 8, text: 9};

console.log(equals(a, b))