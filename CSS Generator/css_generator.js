'use strict'
let tl_range = document.querySelector("#top-left_range");
let tl_text = document.querySelector("#top-left_text");
let tr_range = document.querySelector("#top-right_range");
let tr_text = document.querySelector("#top-right_text");
let br_range = document.querySelector("#bottom-left_range");
let br_text = document.querySelector("#bottom-left_text");
let bl_range = document.querySelector("#bottom-right_range");
let bl_text = document.querySelector("#bottom-right_text");
let rectangle = document.querySelector("#rectangle");
let style_text = document.querySelector("#style_text");
let angles = [0, 0, 0, 0];
InitializeText(tl_range, tl_text);
InitializeText(tr_range, tr_text);
InitializeText(br_range, br_text);
InitializeText(bl_range, bl_text);


tl_range.oninput = OnInput(tl_range, tl_text, rectangle, "top-left", angles, style_text);
tr_range.oninput = OnInput(tr_range, tr_text, rectangle, "top-right", angles, style_text);
br_range.oninput = OnInput(br_range, br_text, rectangle, "bottom-right", angles, style_text);
bl_range.oninput = OnInput(bl_range, bl_text, rectangle, "bottom-left", angles, style_text);

function InitializeText(range, text) {
    if (range !== null && text !== null) {
        text.value = range.value;
    }
    else {
        console.log("Range or text equal null");
    }
}

function AddNewRectangleBorderRadius(angle_array, style_text) {
    let style = angle_array.join('px ');
    style += 'px';
    style_text.innerHTML = 'border-radius: ' + style;
    rectangle.style.borderRadius = style;
}

function OnInput(range, text, rectangle, angle, angles, style_text) {
    return function() {
        if (range !== null && text !== null) {
            text.value = range.value;
            if (rectangle !== null) {
                if (angle === 'top-left') {
                    angles[0] = range.value;
                }
                else if (angle === 'top-right') {
                    angles[1] = range.value;
                }
                else if (angle === 'bottom-right') {
                    angles[2] = range.value;
                }
                else if (angle === 'bottom-left') {
                    angles[3] = range.value;
                }
                else {
                    console.log("Undefined angle");
                }
                AddNewRectangleBorderRadius(angles, style_text);
            }
            else {
                console.log("Rectangle equal null");
            }
        }
        else {
            console.log("Range or text equal null");
        }
        
    }
}
