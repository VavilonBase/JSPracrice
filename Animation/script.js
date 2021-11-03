let squard = document.querySelector('.squard');
let sizeSquard = {
    width: squard.offsetWidth,
    height: squard.offsetHeight
}

let box = document.querySelector('.box__inner');
let sizeBox = {
    width: box.offsetWidth,
    height: box.offsetHeight
}


function StartAnimation() {
    box.style.top = `0px`;
    box.style.left = `0px`;
    let number = sizeSquard.width - sizeBox.width;
    let aroundNumber = Math.ceil(sizeSquard.width - sizeBox.width);
    let delta = aroundNumber - number;
    let i = 0;
    let interval = setInterval(function() {
        if (i === aroundNumber) {
            box.style.top = `${i - delta}px`;
            box.style.left = `${i - delta}px`;
            clearInterval();
        }
        else {
            i++;
            box.style.top = `${i}px`;
            box.style.left = `${i}px`;
        }
    }, 10);
}