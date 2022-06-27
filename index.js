const display = document.querySelector('.display');
let displayValue = '';
let overwrite = false;
let num1 = 0;
let num2 = 0;
let operator = '';


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
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

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
    let valueToDisplay = displayValue;
    if (displayValue.length > 8) {
        valueToDisplay = displayValue.substring(displayValue.length - 8);
    }
    display.textContent = valueToDisplay;
}

function evaluate() {
    num2 = displayValue;
    console.log(`num1: ${num1}, num2: ${num2}, operator: ${operator}`)
    displayValue = operate(num1, num2, operator);
    updateDisplay();
    operator = '';
    overwrite = true;
}

const numpadButtons = document.querySelector('.numpad').querySelectorAll('.numpad-button');

numpadButtons.forEach((btn) => {
    if (btn.classList[1] !== 'button-plusorminus') {
        btn.addEventListener('click', e => {
            if (overwrite) {
                displayValue = e.target.textContent;
                overwrite = false;
                updateDisplay();
                return;
            }
            displayValue += e.target.textContent;
            updateDisplay();
        })
    }
})

document.querySelector('.button-clear').addEventListener('click', () => {
    num1 = 0;
    num2 = 0;
    operator = '';
    displayValue = '';
    updateDisplay();
})

document.querySelector('.button-plusorminus').addEventListener('click', e => {
    if (displayValue.startsWith('-')) {
        displayValue = displayValue.slice(1);
    } else {
        displayValue = '-' + displayValue;
    }
    updateDisplay();
})

document.querySelectorAll('.operator-button').forEach((btn) => {btn.addEventListener('click', (e) => {
    if (displayValue === '') {
        return;
    }
    if (btn.id === 'evaluate') {
        evaluate();
        return;
    }
    if (operator !== '') {
        evaluate();
    }
    operator = e.target.textContent;
    num1 = displayValue;
    updateDisplay();
    displayValue = '';
    
})});

