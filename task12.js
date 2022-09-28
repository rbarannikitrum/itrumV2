// Напишите функцию, которая переставит местами максимальный и минимальный элемент в массиве.
function minMax(array) {
    const arr = array.slice(0, array.length)
    for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }

    let max = arr[arr.length - 1]
    let min = arr[0]
    for (let i = 0; i < array.length; i++) {
        if (array[i] === min) {
            array[i] = max
            for (let j = 0; j < array.length; j++) {
                if (array[j] === max) {
                    array[j] = min
                    break
                }
            }
        }
    }

    return array
}

console.log(minMax([ 1, -10000] ))