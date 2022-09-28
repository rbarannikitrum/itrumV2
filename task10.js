// Имеется массив с финансовыми переводами вида: [ { from: ‘Ivan’, to: ‘Oleg’, amount: 2500}, ...].
// Вычислить среднюю сумму всех переводов и рассчитать для каждого объекта отклонение от среднего и записать в поле diff.
// Например, при средней сумме перевода в 2000 отклонение для перевода { from: ‘Ivan’, to: ‘Oleg’, amount: 2500} будет составлять diff = 2500 - 2000 = 500;

function finances(arr) {

    let res = arr.reduce((accum, el) => accum + el.amount, 0) / arr.length

    arr.forEach(el => {
        el.diff = el.amount - res
    })
    console.log(res, arr)
}

finances([{from: 'Ivan', to: 'Oleg', amount: 2500}, {from: 'Ivan', to: 'Igor', amount: 2000}, {from: 'Oleg', to: 'Igor', amount: 1500}])