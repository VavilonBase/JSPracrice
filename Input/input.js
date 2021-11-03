// function OnChange() {

//     let checkbox;
//     checkbox = document.querySelector("#one");
    
//     if (checkbox.checked) {
//         alert('Checked');
//     }
//     else {
//         alert("Unchecked");
//     }
// }

function fun1() {
    let radio = document.getElementsByName('r1');
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            alert(`Checked ${i} element`);
        }
    }
}