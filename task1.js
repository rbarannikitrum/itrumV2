// Имеется массив объектов вида [{ name: “Milk”, price: 20, amount: 15 }, …],
// хранящий список товаров с их ценой и остатком на складе.
// Используя оператор map заполните новый массив суммарной стоимостью каждого товара на складе (price * amount).

const products = [{name: 'Milk', price: 20, amount: 15}, {name: 'Coffee', price: 30, amount: 17}, {
    name: 'Tea',
    price: 10,
    amount: 14
}]

function totalCounter(products) {

    return products.map(el => el = {name: el.name, total: el.amount * el.price})
}

console.log(totalCounter(products))