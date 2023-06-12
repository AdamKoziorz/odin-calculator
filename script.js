// Adam Koziorz
// Odin-Calculator Project
// JavaScript

const numBtns = document.querySelectorAll(".num-btn");
const opBtns = document.querySelectorAll(".op-btn");
const clearBtn = document.querySelector("#clear-btn");
const calculateBtn = document.querySelector("#calculate-btn");
const lastOp = document.querySelector("#last-operation");
const currentOp = document.querySelector("#current-operation");

// We can model calculation as being a DFA transitioning
// between getting the left number and the right number
const states = ["LEFT", "RIGHT"];
let state = states[0];

let leftSide = "";
let operator = "";
let rightSide = "";
let result = 0;



// **************
// Math functions
// **************

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

// "1000000" rounds the number to 6 decimal places (there are 10 zeroes)
function round(number) {
    return Math.round(number * 1000000) / 1000000
}

// "Operate" is a wrapper function that will call the corresponding
// calculation functions (+, -, *, /) depending on operator
function operate(leftSide, operator, rightSide) {
    switch(operator) {
        case "+":
            return round(add(leftSide, rightSide));
        case "-":
            return round(subtract(leftSide, rightSide));
        case "×":
            return round(multiply(leftSide, rightSide));
        case "÷":
            if (rightSide == "0") {
                alert("Error: Division by Zero");
                return null;
            }
            return round(divide(leftSide, rightSide));
        default:
            alert("Error: Unknown Operation");
            return null;
    }
}



// ***************
// Event Listeners
// ***************

// Add Event Listeners for the Numbers
numBtns.forEach((button) => {
    button.addEventListener('click', () => {
        if (state == states[0]) {
            leftSide += button.textContent;
            currentOp.textContent = leftSide;
        } else if (state == "RIGHT") {
            rightSide += button.textContent;
            currentOp.textContent = rightSide;
        }
    })
})

// Add Event Listeners for the Operations
opBtns.forEach((button) => {
    button.addEventListener('click', () => {
        if (state == "LEFT") {
            operator = button.textContent;
            lastOp.textContent = leftSide + operator;
            state = states[1];
        } else {
            result = operate(leftSide, operator, rightSide);
            operator = button.textContent;
            currentOp.textContent = result;
            lastOp.textContent = result + operator;
            leftSide = result;
            rightSide = "";
        }
    })
})

// Add individual event listeners for func-btns
clearBtn.addEventListener('click', () => {
    leftSide = "";
    operator = "";
    rightSide = "";
    currentOp.textContent = '\u200B';
    lastOp.textContent = '\u200B';
    state = states[0];
})

calculateBtn.addEventListener('click', () => {
    if (!leftSide || !rightSide || !operator) return;
    // If we didn't return, we're in a valid state to calculate
    result = operate(leftSide, operator, rightSide);
    currentOp.textContent = result;
    lastOp.textContent = lastOp.textContent + rightSide + " =";
    leftSide = result;
    rightSide = "";
    state = states[0];
})
