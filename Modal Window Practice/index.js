let fruits = [
    {id: 1, title: 'Apple', price: 20, img: 'https://emigracjaposukces.com/media/k2/items/cache/924e149af069b8ea323a809fbb1171d4_M.jpg'},
    {id: 2, title: 'Orange', price: 30, img: 'https://img.youtube.com/vi/imhj-cR8rb4/0.jpg'},
    {id: 3, title: 'Mango', price: 40, img: 'https://img.youtube.com/vi/vJk_bjGGUDM/0.jpg'}
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img style="height: 300px" src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '200px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
            }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(fruit => fruit.id === id)
    if (btnType == "price") {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <b>${fruit.price}$</b></p>
        `)
        priceModal.open()
    } else if (btnType == 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <b>${fruit.title}</b></p>`
        }).then(() => {
            fruits = fruits.filter(fruit => fruit.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})