// Написать функцию, принимающую на вход строку, написанную в стиле snake_case и возвращающую эту же строку, но уже в стиле camelCase.

function camelCase(str) {
    const new_str = str.split('_').map(el => el[0].toUpperCase() + el.slice(1, el.length)).join("")

    return new_str[0].toLowerCase() + new_str.slice(1, new_str.length)
}

console.log(camelCase('find_and_replace_element_of_array'))