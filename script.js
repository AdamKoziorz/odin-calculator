// Adam Koziorz
// Odin-Calculator Project
// JavaScript Component

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

// It would be better to create a class instead of global mutable
// variables, but this works good enough for the purpose of
// this project (this is just practice after all)
let computed = false;
let leftSide = "";
let operator = "";
let rightSide = "";
let result = 0;



// **************
// Math functions
// **************

// "1000000" rounds the number to 6 decimal places (six zeroes)
function round(number) {
    return Math.round(number * 1000000) / 1000000
}

function add(leftSide, rightSide) {
    return round(Number(leftSide) + Number(rightSide));
}

function subtract(leftSide, rightSide) {
    return round(Number(leftSide) - Number(rightSide));
}

function multiply(leftSide, rightSide) {
    return round(Number(leftSide) * Number(rightSide));
}

function divide(leftSide, rightSide) {
    return round(Number(leftSide) / Number(rightSide));
}


// "Operate" is a wrapper function that will call the corresponding
// calculation functions (+, -, *, /) depending on operator
// Returns a number on success and null on failure
function operate(leftSide, operator, rightSide) {
    switch(operator) {
        case "+":
            return add(leftSide, rightSide);
        case "-":
            return subtract(leftSide, rightSide);
        case "×":
            return multiply(leftSide, rightSide);
        case "÷":
            if (rightSide == "0") {
                alert("Error: Division by Zero");
                return null;
            }
            return divide(leftSide, rightSide);
        default:
            alert("Error: Unknown Operation");
            return null;
    }
}



// ***************************
// Event Listeners and Helpers
// ***************************

// Resets variables
function clear() {
    leftSide = "";
    operator = "";
    rightSide = "";
    result = 0;
    currentOp.textContent = '\u200B';
    lastOp.textContent = '\u200B';
    state = states[0];
    computed = false;
}

function present() {
    currentOp.textContent = result;
    leftSide = result;
    rightSide = "";
    computed = true;
}


// Add Event Listeners for the Numbers
numBtns.forEach((button) => {
    button.addEventListener('click', () => {
        if (computed) return;
        if (state == states[0]) {
            if (button.textContent === "0" && !leftSide) return;
            leftSide += button.textContent;
            lastOp.textContent += button.textContent;
        } else if (state == states[1]) {
            if (button.textContent === "0" && !rightSide) return;
            rightSide += button.textContent;
            lastOp.textContent += button.textContent;
        }
    })
})

// Add Event Listeners for the Operations
opBtns.forEach((button) => {
    button.addEventListener('click', () => {
        if (!leftSide) return;
        else if (state == states[0]) {
            operator = button.textContent;
            lastOp.textContent = leftSide + operator;
            state = states[1];
        } else if (state == states[1] && rightSide) {
            result = operate(leftSide, operator, rightSide);
            if (result === null) {
                clear();
            } else {
                operator = button.textContent;
                lastOp.textContent = result + operator;
                present();
            }
        }
        computed = false;
    })
})

// Add individual event listeners for func-btns
clearBtn.addEventListener('click', clear);

calculateBtn.addEventListener('click', () => {
    if (!leftSide || !rightSide || !operator) return;
    // If we didn't return, we're in a valid state to calculate
    result = operate(leftSide, operator, rightSide);
    lastOp.textContent = lastOp.textContent + " =";
    present();
    state = states[0];
})
