let items_array = document.querySelectorAll('.items');

items_array.forEach(item => {
    item.style.display = 'none';
});

let menu_array = document.querySelectorAll('.menu');

menu_array.forEach(menu => {
    menu.onmouseover = (e) => {
        e.target.parentNode.children[1].style.display = 'block'
    };
    menu.onmouseleave = (e) => {
        e.target.children[1].style.display = 'none'

    };
});

