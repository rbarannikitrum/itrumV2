// Дан массив строк. Написать функцию, которы упорядочит массив по длине строк.
function checkLength(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr[i].length > arr[i + 1].length) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr
}

console.log(checkLength(["test", "education", "part", "2", "exceed.team"]))