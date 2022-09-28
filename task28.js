// Имеется объект пользователя следующего вида const user = {id: 123, first_name: ‘Ivan’, last_name: ‘Ivanov’, password: ‘Mypwd!23’, age: 13}
// Также имеется объект с измененными полями: const changed = { age: 15, password: ‘new password }
//Написать функцию, принимающую на вход исходный объект и объект с измененными параметрами и возвращающая обновленный исходный объект. 
// (В объекте и changed могут быть любые поля из user в любом количестве). Для приведённого выше примера результат должен быть следующий:
// {id: 123, first_name: ‘Ivan’, last_name: ‘Ivanov’, password: ’new password’, age: 15}

function updateInfo(oldInfo, newInfo) {
    for (const key in oldInfo) {
        if (newInfo[key]) {
            oldInfo[key] = newInfo[key]
        }
    }

    return oldInfo
}

console.log(updateInfo({id: 123, first_name: 'Ivan', last_name: 'Ivanov', password: 'Mypwd!23', age: 13}, {age: 15, password: 'new password'}))


