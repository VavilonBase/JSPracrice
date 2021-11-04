

/*
* title: string (*)
* closable: boolean x (*)
* content: string (*)
* width: string (400px) (*)
* destroy(): void (*)
* click x or overlay close window (*)
* ---------------------------------
* setContent(html: string): void | public (*)
* onClose(): void (*)
* onOpen(): void (*)
* beforeClose(): boolean | true - close else not close (*)
* -------------------------------------------------------
* animate.css
* */
$.modal = function(options) {
    const ANIMATION_SPEED = 5000
    const width = 'width' in options ? options.width : '400px'
    const title = 'title' in options ? options.title : 'Modal Window'
    const closable = 'closable' in options ? (!options.closable ? 'hidden' : 'visible') : 'visible'
    const onClose = 'onClose' in options
    const onOpen = 'onOpen' in options
    const beforeClose = 'beforeClose' in options ? options.beforeClose : false
    let content = 'content' in options ? options.content : 'Content'
    let closing = false

    const $modal = _createModal(options)

    options.beforeClose = () => {
        beforeClose && beforeClose()
        return $modal.classList.contains('open')
    }

    function close() {
        if (options.beforeClose()) {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
            onClose && options.onClose()
        }
    }

    function open() {
        !closing && $modal.classList.add('open')
        onOpen && options.onOpen()
    }

    function clickOverlay(event) {
        for (let path of event.path) {
            if (path.className === 'modal-window') {
                return
            }
        }
        close();
    }

    function _createModal() {
        const modal = document.createElement('div')
        modal.classList.add('amodal')
        modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window" style="width: ${width}">
                <div class="modal-header">
                    <span class="modal-title">${title}</span>
                    <span class="modal-close" style="visibility: ${closable}">&times;</span>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button>OK</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    `)
        document.body.appendChild(modal)
        document.querySelector('.modal-close').addEventListener('click', close)
        document.querySelector('.modal-overlay').addEventListener('click', clickOverlay)

        return modal
    }



    return {
        open,
        close,
        setContent(html) {
            content = html
            document.querySelector('.modal-body').innerHTML = content
        },
        beforeClose: options.beforeClose,
        destroy() {
            document.querySelector('.modal-close').removeEventListener('click', close)
            document.querySelector('.modal-overlay').removeEventListener('click', clickOverlay)
            document.querySelector('.amodal').remove()
        }
    }
}

