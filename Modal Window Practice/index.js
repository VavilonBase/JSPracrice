const fruits = [
    {id: 1, title: 'Apple', price: 20, img: 'https://emigracjaposukces.com/media/k2/items/cache/924e149af069b8ea323a809fbb1171d4_M.jpg'},
    {id: 2, title: 'Orange', price: 30, img: 'https://img.youtube.com/vi/imhj-cR8rb4/0.jpg'},
    {id: 3, title: 'Mango', price: 40, img: 'https://img.youtube.com/vi/vJk_bjGGUDM/0.jpg'}
]
const modal = $.modal({
    title: 'Artem Modal',
    closable: true,
    content: `
        <p>Modal is working</p>
        <p>Lorem ipsum dolor sit.</p>
    `,
    width: '200px',
    footerButtons: [
        {text: 'OK', type: 'primary', handler() {
                console.log('Primary brn clicked')
                modal.close()
            }},
        {text: 'CANCEL', type: 'danger', handler() {
                console.log('DANGER brn clicked')
                modal.close()
            }},
    ]
})
