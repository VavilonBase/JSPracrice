function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('amodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Modal title</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>lorem4</p>
                    <p>lorem4</p>
                </div>
                <div class="modal-footer">
                    <button>OK</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    `)
    document.body.appendChild(modal)
    return modal
}

/*
* title: string
* closable: boolean x
* content: string
* width: string (400px)
* destroy(): void
* click x or overlay close window
* ---------------------------------
* setContent(html: string): void | public
* onClose(): void
* onOpen(): void
* beforeClose(): boolean | true - close else not close
* -------------------------------------------------------
* animate.css
* */
$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    return {
        open() {
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
        destroy() {}
    }
}

