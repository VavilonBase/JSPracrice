$.select = function(options) {
    const _createAselectNode = () => {
        const aselect = document.createElement('div')
        aselect.classList.add('aselect')
        return aselect
    }

    const _createAselectText = () => {
        const aselectText = document.createElement('span')
        aselectText.classList.add('aselect__input-text')
        aselectText.textContent = options.options[0].title || ''
        return aselectText
    }

    const _createAselectArrow = () => {
        const aselectArrow = document.createElement('span')
        aselectArrow.classList.add('aselect__input-arrow')
        aselectArrow.innerHTML = `&#9660;`
        return aselectArrow
    }

    const _createAselectOption = (option) => {
        const aselectOption = document.createElement('div')
        aselectOption.classList.add('aselect__option')
        aselectOption.textContent = option.title
        return aselectOption
    }

    const _createAselectOptions = () => {
        const aselectOptions = options.options.map(option => _createAselectOption(option))

        if (aselectOptions.length != 0) {
            aselectOptions[0].classList.add('aselect__selected')
        }
        return aselectOptions
    }

    //Aselect node
    const $aselect = _createAselectNode()
    const $aselectText = _createAselectText()
    const $aselectArrow = _createAselectArrow()
    const $aselectOptions = _createAselectOptions()

    function _createSelect() {
        //Root
        const $root = document.querySelector(options.root)

        //Create select options
        let aselectOptions = ''
        options.options.forEach((option, index) => {
            if (index === 0) {
                aselectOptions += `<div class="aselect__option aselect__selected">$option.title</div>`
            } else {
                aselectOptions += `<div class="aselect__option">$option.title</div>`
            }
        })

        //Create html
        const html = `
            <div class="aselect__overlay">
                <div class="aselect__body">
                    <div class="aselect__input">
                    </div>
                    <div class="aselect__dropdown">
                    </div>
                </div>
            </div>
        `

        $aselect.innerHTML = html

        const aselectInput = $aselect.querySelector('.aselect__input')
        aselectInput.appendChild($aselectText)
        aselectInput.appendChild($aselectArrow)

        const aselectDropdown = $aselect.querySelector('.aselect__dropdown')
        $aselectOptions.forEach($aselectOption => {
            aselectDropdown.appendChild($aselectOption)
        })

        $root.appendChild($aselect)

        return
    }

    _createSelect()

    return {
        open: () => {
            console.log('Open')
        },
        close: () => {
            console.log('Close')
        },
        select: (id) => {
            console.log(`Selected: ${id}`)
        },
        destroy: () => {
            console.log('Destroy')
        }
    }
}