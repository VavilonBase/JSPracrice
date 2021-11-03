

/*
* title: string (*)
* closable: boolean x
* content: string (*)
* width: string (400px) (*)
* destroy(): void (*)
* click x or overlay close window (*)
* ---------------------------------
* setContent(html: string): void | public (*)
* onClose(): void
* onOpen(): void
* beforeClose(): boolean | true - close else not close
* -------------------------------------------------------
* animate.css
* */
$.modal = function(options) {
    let closing = false
    function close() {
        closing = true
        $modal.classList.remove('open')
        $modal.classList.add('hide')
        setTimeout(() => {
            $modal.classList.remove('hide')
            closing = false
        }, ANIMATION_SPEED)
    }

    function clickOverlay(event) {
        for (path of event.path) {
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
            <div class="modal-window" style="width: ${'width' in options ? options.width : '400px'}">
                <div class="modal-header">
                    <span class="modal-title">${'title' in options ? options.title : 'Modal Window'}</span>
                    <span class="modal-close"">&times;</span>
                </div>
                <div class="modal-body">
                    ${'content' in options ? options.content : 'Content'}
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

    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)

    return {
        open() {
            !closing && $modal.classList.add('open')
        },
        close,
        setContent(html) {
            document.querySelector('.modal-body').innerHTML = html
        },
        destroy() {
            document.querySelector('.modal-close').removeEventListener('click', close)
            document.querySelector('.modal-overlay').removeEventListener('click', clickOverlay)
            document.querySelector('.amodal').remove()
        }
    }
}

