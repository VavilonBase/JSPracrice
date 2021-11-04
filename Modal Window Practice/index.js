const modal = $.modal({
    title:'My Modal Window',
    content: `
    <p>Lorem ipsum dolor sit.</p>
    <p>Lorem ipsum dolor sit.</p>
    `,
    width: '600px',
    closable: false,
    onClose: () => {
        console.log('close')
    },
    onOpen: () => {
        console.log('open')
    },
    beforeClose: () => {
        console.log('beforeClose')
    }
})
