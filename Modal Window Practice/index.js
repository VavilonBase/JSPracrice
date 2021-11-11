const fruits = [
    {id: 1, title: 'Apple', price: 20, img: 'https://emigracjaposukces.com/media/k2/items/cache/924e149af069b8ea323a809fbb1171d4_M.jpg'},
    {id: 2, title: 'Orange', price: 30, img: 'https://img.youtube.com/vi/imhj-cR8rb4/0.jpg'},
    {id: 3, title: 'Mango', price: 40, img: 'https://img.youtube.com/vi/vJk_bjGGUDM/0.jpg'}
]
/*
1. Динамически на основе массива вывести список карточек
2. Показать цену  в модалке (одна модалка)
3. При нажатии кнопки удалить показать модалку с двумя кнопками
--------
При удалении удаление карточки из DOM - на основе плагина modal - другой плагин $.confirm
 */
const priceModal = $.modal({
    title: 'Цена',
    closable: true,
    content: `
        <p>Modal is working</p>
        <p>Lorem ipsum dolor sit.</p>
    `,
    width: '200px',
    footerButtons: [
        {text: 'OK', type: 'primary', handler() {
                priceModal.close()
            }}
    ]
})

//Создаем карточки
const container = document.querySelector('.container')
const cards = document.createElement('div')
cards.classList.add('row')
fruits.forEach((fruit) => {
    cards.appendChild(createCard(fruit))
})
container.appendChild(cards)

// const modal = $.modal({
//     title: 'Artem Modal',
//     closable: true,
//     content: `
//         <p>Modal is working</p>
//         <p>Lorem ipsum dolor sit.</p>
//     `,
//     width: '200px',
//     footerButtons: [
//         {text: 'OK', type: 'primary', handler() {
//                 console.log('Primary brn clicked')
//                 modal.close()
//             }},
//         {text: 'CANCEL', type: 'danger', handler() {
//                 console.log('DANGER brn clicked')
//                 modal.close()
//             }},
//     ]
// })

function createCard(fruit) {
    let card = document.createElement('div')
    card.classList.add('col')
    card.innerHTML = `
    <div class="card">
        <img style="height: 300px" src="${fruit.img}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <button class="btn btn-primary" data-check="true">Посмотреть цену</button>
            <button class="btn btn-danger" data-delete="true">Удалить</button>
        </div>
    </div>
    `
    function clickBtn(event) {
        if (event.target.dataset.check) {
            priceModal.setContent(`<p>Цена равна: ${fruit.price}</p>`)
            priceModal.open()
        } else if (event.target.dataset.delete) {
            event.target.parentNode.parentNode.parentNode.parentNode.removeChild(card)
        }
    }
    card.addEventListener('click', clickBtn)
    return card
}