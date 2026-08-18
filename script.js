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
    numOne = +numOne;
    numTwo = +numTwo;
    if (operator == '+') {
        return add(numOne, numTwo);
    } else if (operator == '-') {
        return subtract(numOne, numTwo);
    } else if (operator == '*') {
        return multiply(numOne, numTwo);
    } else if (operator == '/') {
        return divide(numOne, numTwo);
    } else {
        return 'error not a valid operator'
    };
};

let numOne = '';
let operator = '';
let numTwo = '';

const container = document.querySelector("#container");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((bttn) => {
    bttn.addEventListener("click", (e) => {
        if (bttn.className == 'clear') {
            numOne = '';
            operator = '';
            numTwo = '';
            display.textContent = '[cleared, please enter a new operation]';
        };

        if (bttn.className == 'enter') {
            display.textContent = operate(operator, numOne, numTwo);
        };

        if (bttn.className == 'num' && operator == '') {
            numOne += e.target.textContent;
            display.textContent = numOne;
        } else if (bttn.className == 'opp' && operator == '') {
            operator += e.target.textContent;
            display.textContent = operator;
            passover = true;
        } else if (bttn.className == 'num' && operator != true) {
            numTwo += e.target.textContent;
            display.textContent = numTwo;
        };

    });
});


