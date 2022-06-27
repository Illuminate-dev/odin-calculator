const display = document.querySelector('.display');
let displayValue = '';


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1,num2);
        case '-':
            return subtract(num1,num2);
        case '*':
            return multiply(num1,num2);
        case '/':
            return divide(num1, num2);
    }
}

function updateDisplay() {
    display.textContent = displayValue;
}

const numpadButtons = document.querySelector('.numpad').querySelectorAll('.numpad-button');

numpadButtons.forEach((btn) => {
    if (!btn.classList.contains('button-clear')) {
        btn.addEventListener('click', e => {
            displayValue += e.target.textContent;
            updateDisplay();
        })
    }
})

document.querySelector('.button-clear').addEventListener('click', () => {
    displayValue = '';
    updateDisplay();
})