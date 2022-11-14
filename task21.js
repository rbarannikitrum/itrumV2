// Написать функцию, которая принимает на вход объект вида { first_name: ‘Ivan’, last_name: ‘Ivanov’, email: ‘ivanov@pochta.com’ }
// и возвращает строку вида: “Ivanov Ivan E-mail: ivanov@pochta.com”

function objToStr(obj) {

    return `${obj.last_name} ${obj.first_name} E-mail: ${obj.email}`
}

console.log(objToStr({first_name: 'Ivan', last_name: 'Ivanov', email: 'ivanov@pochta.com'}))