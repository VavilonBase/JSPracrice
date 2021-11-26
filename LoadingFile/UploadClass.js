export class Upload {
    constructor(selector, options = {}) {
        this.options = options
        this.onUpload = this.options.onUpload ?? this.#noop
        this.files = []
        this.input = document.querySelector(selector)
        this.btnOpen = this.#createElement('button', ['btn'], 'Открыть')
        this.btnUpload = this.#createElement('button', ['btn', 'primary'], 'Загрузить')
        this.preview = this.#createElement('div', ['preview'])

        this.#setUp()

        this.#render()
    }

    clickInputHandler(event) {
        if (!event.target.files.length) {
            return
        }

        this.files = Array.from(event.target.files)
        this.preview.innerHTML = ''

        this.files.forEach(file => {
            if (!file.type.match('image')) return

            const reader = new FileReader()

            reader.onload = ev => {
                const src = ev.target.result
                this.preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-image">
                        <div class="preview-remove" data-name="${file.name}">&times;</div>
                        <img src="${src}" alt="${file.name}">
                        <div class="preview-info">
                            <span>${file.name}</span>
                            ${this.#bytesToSize(file.size)}
                        </div>
                    </div>
                `)
            }

            reader.readAsDataURL(file)
        })
    }

    clickBtnOpenHandler(event) {
        this.input.click()
    }

    clickBtnUploadHandler(event) {
        this.preview.querySelectorAll('.preview-remove').forEach(e => e.remove())
        const previewInfo = this.preview.querySelectorAll('.preview-info')
        previewInfo.forEach(this.#clearPreview)
        this.onUpload(this.files, previewInfo)
    }

    clickPreviewHandler(event) {
        if (!event.target.dataset.name) {
            return
        }

        const {name} = event.target.dataset

        this.files = this.files.filter(file => file.name !== name)

        const block = event.target.closest('.preview-image')
        block.classList.add('removing')
        setTimeout(() => block.remove(), 300)
    }

    #setUp() {

        if (this.options.multi) {
            this.input.setAttribute('multiple', true)
        }

        if (this.options.accept && Array.isArray(this.options.accept)) {
            this.input.setAttribute('accept', this.options.accept.join(','))
        }

        this.clickBtnOpenHandler = this.clickBtnOpenHandler.bind(this)
        this.clickInputHandler = this.clickInputHandler.bind(this)
        this.clickBtnUploadHandler = this.clickBtnUploadHandler.bind(this)
        this.clickPreviewHandler = this.clickPreviewHandler.bind(this)

        this.input.addEventListener('change', this.clickInputHandler)
        this.btnOpen.addEventListener('click', this.clickBtnOpenHandler)
        this.btnUpload.addEventListener('click', this.clickBtnUploadHandler)
        this.preview.addEventListener('click', this.clickPreviewHandler)
    }

    #render() {
        this.input.insertAdjacentElement('afterend', this.preview)
        this.input.insertAdjacentElement('afterend', this.btnUpload)
        this.input.insertAdjacentElement('afterend', this.btnOpen)
    }

    #createElement(tag, classes = [], content) {
        const node = document.createElement(tag)

        if (classes.length) {
            node.classList.add(...classes)
        }

        if (content) {
            node.textContent = content
        }
        return node
    }

    #bytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (!bytes) return '0 Byte'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
    }

    #clearPreview(el) {
        el.style.bottom = '4px'
        el.innerHTML = `<div class="preview-info-progress"></div>`
    }

    #noop(files, previewInfo) {}
}