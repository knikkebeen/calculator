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
        return 'error not a valid operator'; //not necessary anymore
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
        // Clears the calculator if 'clear' is pressed 
        // OR a result is displayed and a digit is pressed before an operator.
        if (bttn.className == 'clear'
            || (resultDisplayed === true && e.target.className == 'num' && operator == '')
        ) {
            numOne = '';
            operator = '';
            numTwo = '';
            display.textContent = '';
            resultDisplayed = false;
        };

        // If enter is pressed we want the result but NOT before all numbers and the operator is selected.
        // Same goes for pressing an operator *after* all variables are given.
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

