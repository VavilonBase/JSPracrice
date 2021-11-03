// function fun1() {
//     let select = document.querySelector('#mySelect').selectedIndex;
//     let options = document.querySelector('#mySelect').options;
//     alert(`Checked ${options[select].text}`);
// }

// function fun1() {
//     let range = document.querySelector("#r1");
//     let paragraph = document.querySelector('#one');
//     paragraph.innerHTML = range.value;
// }

// function fun1() {
//     let range = document.querySelector("#r1");
//     let i1 = document.querySelector('#i1');
//     i1.value = range.value;
// }

function fun1() {
    let range = document.querySelector("#r1");
    let div = document.querySelector('#test');
    div.style.width = range.value + 'px';
}