function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, numOne, numTwo) {
    // Convert to numbers so '+' doesn't concatenate.
    numOne = +numOne;
    numTwo = +numTwo;

    if (operator == '+') {
        return add(numOne, numTwo);
    } else if (operator == '-') {
        return subtract(numOne, numTwo);
    } else if (operator == '*') {
        return multiply(numOne, numTwo);
    } else if (operator == '/') {
        if (numTwo == 0) {
            return "NaN";
        };
        return divide(numOne, numTwo);
    } else {
        return 'error not a valid operator';
    };
};

const container = document.querySelector("#container");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let numOne = '';
let operator = '';
let numTwo = '';
let resultDisplayed = false;

buttons.forEach((bttn) => {
    bttn.addEventListener("click", (e) => {

        if (bttn.className == 'backspace') {
            if (resultDisplayed === true) {
                return;
            } else if (numOne != '' && operator == '' && numTwo == '') {
                numOne = numOne.split("");
                numOne.pop();
                numOne = numOne.join("");
                display.textContent = numOne;
            } else if (numOne != '' && operator != '' && numTwo != '') {
                numTwo = numTwo.split("");
                numTwo.pop();
                numTwo = numTwo.join("");
                display.textContent = numTwo;
            }
        };

        // Begin a new operation when a result is displayed and a digit is pressed before an operator.
        // Or clear is pressed
        if (bttn.className == 'clear'
            || (resultDisplayed === true && e.target.className == 'num' && operator == '')
        ) {
            numOne = '';
            operator = '';
            numTwo = '';
            display.textContent = '[enter your operation]';
            resultDisplayed = false;
        };

        // Calculates the result if enter is pressed OR an operator is pressed *after* all variables are given.
        if (((bttn.className == 'enter') && ((numOne != '') && (numTwo != '') && (operator != ''))) 
            || ((bttn.className == 'opp') && ((numOne != '') && (numTwo != '') && (operator != '')))
        ) {
            numOne = operate(operator, numOne, numTwo).toString();
            display.textContent = numOne;
            numTwo = '';
            resultDisplayed = true;

            // If enter was pressed, the operator is cleared so it can be used again.
            // If an operator was pressed, it's stored for the next operation.
            if (e.target.className == 'enter') {
                operator = '';
            } else {
                operator = e.target.textContent;
            }
        };

        // idk this one's a mess
        if (bttn.className == 'num' && operator == '') {
            if (e.target.textContent == '.' && numOne.includes('.')) {
                return;
            };
            if (e.target.textContent == '.' && numOne == '') {
                numOne += '0.'
                display.textContent = numOne;
                return;
            };
            numOne += e.target.textContent;
            display.textContent = numOne;

        } else if (bttn.className == 'opp' && numOne != '') {
            operator = e.target.textContent;
            // cba to explain this one it just needs to be set to false here or entering a new number will reset everything.
            resultDisplayed = false;

        } else if (bttn.className == 'num' && operator != '') {
            if (e.target.textContent == '.' && numTwo.includes('.')) {
                return;
            };
            if (e.target.textContent == '.' && numTwo == '') {
                numTwo += '0.'
                display.textContent = numTwo;
                return;
            };
            numTwo += e.target.textContent;
            display.textContent = numTwo;
        };
    });
});

