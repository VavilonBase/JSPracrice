function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (!bytes) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

const createElement = (tag, classes = [], content) => {
    const node = document.createElement(tag)

    if (classes.length) {
        node.classList.add(...classes)
    }

    if (content) {
        node.textContent = content
    }

    return node
}

function noop(files) {}

export function upload(selector, options = {}) {
    let files = []
    const onUpload = options.onUpload ?? noop
    const input = document.querySelector(selector)
    const preview = createElement('div', ['preview'])
    const btnOpen = createElement('button', ['btn'], 'Открыть')
    const btnUpload = createElement('button', ['btn', 'primary'], 'Загрузить')
    btnUpload.style.display = 'none'
    if (options.multi) {
        input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', btnUpload)
    input.insertAdjacentElement('afterend', btnOpen)

    const triggerInput = () => {
        console.log('click')
        input.click()
    }

    const changeHandler = event => {
        if (!event.target.files.length) {
            return
        }

        files = Array.from(event.target.files)
        preview.innerHTML = ''
        btnUpload.style.display = 'inline'

        files.forEach(file => {
            if (!file.type.match('image')) {
                return
            }
            const reader = new FileReader()

            reader.onload = ev => {
                const src = ev.target.result
                preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-image">
                        <div class="preview-remove" data-name="${file.name}">&times;</div>
                        <img src="${src}" alt="${file.name}">
                        <div class="preview-info">
                            <span>${file.name}</span>
                            ${bytesToSize(file.size)}
                        </div>
                    </div>
                `)
            }

            reader.readAsDataURL(file)
        })
    }

    const removeHandler = event => {
        if (!event.target.dataset.name) {
            return
        }

        const {name} = event.target.dataset
        files = files.filter(file => file.name !== name)
        const block = preview
            .querySelector(`[data-name="${name}"]`)
            .closest('.preview-image')
        block.classList.add('removing')
        setTimeout(() => block.remove(), 300)

        if (!files.length) {
            btnUpload.style.display = 'none'
        }
    }

    const clearPreview = el => {
        el.style.bottom = '4px'
        el.innerHTML = `<div class="preview-info-progress"></div>`
    }

    const uploadHandler = () => {
        preview.querySelectorAll('.preview-remove').forEach(e => e.remove())
        const previewInfo = preview.querySelectorAll('.preview-info')
        previewInfo.forEach(clearPreview)
        onUpload(files, previewInfo)
    }

    btnOpen.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
    preview.addEventListener('click', removeHandler)
    btnUpload.addEventListener('click', uploadHandler)
}