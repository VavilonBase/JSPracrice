$.confirm = function(options) {
    let deleteHandler = () => {}

    const confirmModal = $.modal({
        ...options,
        footerButtons: [
            {text: 'OK', type: 'primary', handler() {
                    deleteHandler()
                    confirmModal.close()
                }},
            {text: 'CANCEL', type: 'primary', handler() {
                    confirmModal.close()
                }}
        ]
    })

    return {
        open: () => confirmModal.open(),
        close: () => confirmModal.close(),
        setDeleteHandler: (deleteHandlerParam) => deleteHandler = deleteHandlerParam,
        destroy: () => confirmModal.destroy()
    }
}