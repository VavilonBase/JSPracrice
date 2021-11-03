let btn = document.querySelector('#btn');
let modal_window = document.querySelector('#modal_window');
btn.onclick = OpenModelWindow(modal_window);

let exit_zone = document.querySelector('#exit_zone');
exit_zone.onclick = CloseModelWindow(modal_window);

let exit = document.querySelector('#exit');
exit.onclick = CloseModelWindow(modal_window);

function OpenModelWindow(modal_window) {
    return () => {
        modal_window.classList.remove('hide');
        modal_window.classList.add('show');
    };
}

function CloseModelWindow(modal_window) {
    return () => {
        modal_window.classList.remove('show');
        modal_window.classList.add('hide');
    };
}