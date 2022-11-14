//Имеется объект пользователя следующего вида {id: 123, first_name: ‘Ivan’, last_name: ‘Ivanov’, password: ‘Mypwd!23’, age: 13}
// Пользуясь возможностями ES6 синтаксиса получить на основании пользователя новый объект, но без поля password.

const obj = {id: 123, first_name: 'Ivan', last_name: 'Ivanov', password: 'Mypwd!23', age: 13}

const {id, first_name, last_name, age} = obj

const new_obj = {id, first_name, last_name, age}

console.log(new_obj)