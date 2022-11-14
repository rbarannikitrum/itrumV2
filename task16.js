// Написать функцию, принимающую на вход неотформатированный номер телефона и возвращающую его в отформатированном виде.

function formatPhone(phone) {
    if (phone.length === 11) {

        return `${phone[0]} (${phone[1]}${phone[2]}${phone[3]}) ${phone[4]}${phone[5]}${phone[6]}-${phone[7]}${phone[8]}-${phone[9]}${phone[10]}`
    }

    return 'incorrect number'
}

console.log(formatPhone('88005553535'))