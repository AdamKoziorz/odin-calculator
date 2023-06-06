// Adam Koziorz
// Odin-Calculator Project
// JavaScript

const numBtns = document.querySelectorAll(".num-btn");

let leftSide = 0;
let operator = "";
let rightSide = 0;

function add(leftSide, rightSide) {
    return Number(leftSide) + Number(rightSide);
}

function subtract(leftSide, rightSide) {
    return Number(leftSide) - Number(rightSide);
}

function multiply(leftSide, rightSide) {
    return Number(leftSide) * Number(rightSide);
}

function divide(leftSide, rightSide) {
    return Number(leftSide) / Number(rightSide);
}


// "Operate" is a wrapper function that will call the corresponding
// calculation functions (+, -, *, /) depending on operator
function operate(leftSide, operator, rightSide) {
    switch(operator) {
        case "+":
            return add(leftSide, rightSide);
        case "-":
            return subtract(leftSide, rightSide);
        case "*":
            return multiply(leftSide, rightSide);
        case "/":
            if (rightSide == "0") {
                alert("Error: Division by Zero");
                break;
            }
            return divide(leftSide, rightSide);
        default:
            alert("Error: Unknown Operation");
    }
}