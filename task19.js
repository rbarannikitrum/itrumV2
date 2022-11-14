// Написать функцию, которая принимает на вход E-mal в виде строки и возвращает объект вида { username, domain }

function emails(email) {
    const split = email.split('@', 2)

    return {username: split[0], domain: split[1]}
}

console.log(emails('ivanov.oleg@pochta.com'))