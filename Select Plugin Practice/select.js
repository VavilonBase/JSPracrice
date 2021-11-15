$.select = function(options) {
    const _createAselectNode = () => {
        const aselect = document.createElement('div')
        aselect.classList.add('aselect')
        aselect.dataset.aselect = 'close'
        return aselect
    }

    const _createAselectOption = (option) => {
        const aselectOption = document.createElement('div')
        aselectOption.classList.add('aselect__option')
        aselectOption.textContent = option.title
        aselectOption.dataset.aselect = 'option'
        aselectOption.dataset.value = option.id
        return aselectOption
    }

    const _createAselectOptions = () => {
        const aselectOptions = options.options.map(option => _createAselectOption(option))

        return aselectOptions
    }

    //Aselect node
    const $aselect = _createAselectNode()
    const $aselectOptions = _createAselectOptions()
    //Selected option
    let selected = 0;
    function _createSelect() {
        //Root
        const $root = document.querySelector(options.root)

        //Create html
        const html = `
            <div class="aselect__overlay" data-aselect="overlay">
                <div class="aselect__body">
                    <div class="aselect__input" data-aselect="input">
                        <div class="aselect__input-text" data-aselect="input">${options.options[0].title || ''}</div>
                        <div class="aselect__input-arrow" data-aselect="input">&#9660;</div>
                    </div>
                    <div class="aselect__dropdown">
                    </div>
                </div>
            </div>
        `
        //Set innerHTML to the aselect
        $aselect.innerHTML = html

        //Append aselect to the DOM in end of the root
        $root.appendChild($aselect)

        return
    }

    //Create select
    _createSelect()

    //Dropdown element
    const $aselectDropdown = $aselect.querySelector('.aselect__dropdown')
    //Input text
    const $aselectInputText = $aselect.querySelector('.aselect__input-text')
    //Input arrow
    const $aselectInputArrow = $aselect.querySelector('.aselect__input-arrow')
    //Destroyed
    let destroyed = false;
    //Function update option, return selected option
    function _updateOption(newSelect) {
        let aselectOptionIndex = null
        $aselectDropdown.innerHTML = ''
        //Delete class aselect__selected of the previous option and set this class to the new option
        $aselectOptions.forEach(($aselectOption, index) => {
            if (+$aselectOption.dataset.value === selected) {
                $aselectOption.classList.remove('aselect__selected')
            }
            if (+$aselectOption.dataset.value === newSelect) {
                $aselectOption.classList.add('aselect__selected')
                aselectOptionIndex = index
            }
            $aselectDropdown.appendChild($aselectOption)
        })

        //selected = newSelect
        selected = newSelect

        return options.options[aselectOptionIndex]
    }

    function select(id) {
        if (!destroyed) {
            let selectedOption = _updateOption(id)
            $aselectInputText.textContent = selectedOption.title
            console.log(selectedOption)
        } else {
            console.log('Select destroyed')
        }
    }


    //Update Options
    if ($aselectOptions.length !== 0) {
        _updateOption(+$aselectOptions[0].dataset.value)
    }


    //Event Listeners
    const open = () => {
        if (!destroyed) {
            $aselect.classList.add('open')
        } else {
            console.log('Select destroyed')
        }
    }

    const close = () => {
        if (!destroyed) {
            $aselect.classList.remove('open')
        } else {
            console.log('Select destroyed')
        }
    }

    const clickListener = (event) => {
        const dataAselect = event.target.dataset.aselect

        const openSelect = () => {
            $aselect.dataset.aselect = 'open'
            open()
            $aselectInputArrow.innerHTML = '&#9650;'
        }

        const closeSelect = () => {
            $aselect.dataset.aselect = 'close'
            close()
            $aselectInputArrow.innerHTML = '&#9660;'
        }

        if (dataAselect) {
            //if click on input, input text or input arrow
            if (dataAselect === 'input') {
                if ($aselect.dataset.aselect === 'close') {
                    openSelect()
                } else {
                    closeSelect()
                }
            } else if (dataAselect === 'overlay') {
                //if click on overlay
                if ($aselect.dataset.aselect === 'open') {
                    closeSelect()
                }
            } else if (dataAselect === 'option') {
                //if click on option
                select(+event.target.dataset.value)
                closeSelect()
            }

        }
    }

    //Add Event Listener
    $aselect.addEventListener('click', clickListener)

    return {
        open,
        close,
        select,
        destroy: () => {
            $aselect.removeEventListener('click', clickListener)
            $aselect.parentNode.removeChild($aselect)
            destroyed = true
        }
    }
}