const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator-button');
let displayValue = '';
let overwrite = false;
let num1 = 0;
let num2 = 0;
let operator = '';
let elemToChangeBack = null;

function changeColorBack() {
    if (elemToChangeBack) {
        elemToChangeBack.style.backgroundColor = '#333';
        elemToChangeBack = null;
    }
}

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
    if (num1 == 0 && num2 == 0 && operator === '/') {
        return ":(";
    }
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
    let out = operate(num1, num2, operator);
    if(out.toString().includes('.')) {
        out = out.toFixed(7 - Math.round(out.toString()).toString().length );
    }
    displayValue = out.toString();
    updateDisplay();
    operator = '';
    overwrite = true;
}


const numpadButtons = document.querySelector('.numpad').querySelectorAll('.numpad-button');

numpadButtons.forEach((btn) => {
    if (btn.classList[1] !== 'button-plusorminus') {
        btn.addEventListener('click', e => {
            if (btn.classList[1] === 'button-dot' && displayValue.includes('.')) {
                return;
            }
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

function handleNumpad(key) {
    if (key==='.' && displayValue.includes('.')) {
        return;
    }
    if (overwrite) {
        displayValue = key;
        overwrite = false;
        updateDisplay();
        return;
    }
    displayValue += key;
    updateDisplay();

}

function handleOperator(key) {
    if (displayValue === '') {
        return;
    }
    if (key === '=') {
        if(!operator || !num1 ) {
            return;
        }
        changeColorBack();
        evaluate();
        return;
    }
    if (operator !== '') {
        evaluate();
    }
    changeColorBack();
    operator = key;
    num1 = displayValue;
    updateDisplay();
    displayValue = '';
    let elem = Array.from(operators).find(val => val.textContent === key)
    
    elem.style.backgroundColor = '#555'
    elemToChangeBack = elem;
}

window.addEventListener('keydown', (e) => {
    key = e.key;
    changeColorBack();
    if (!isNaN(parseInt(key)) || key === '.') {
        handleNumpad(key);
    } else if (['+', '-', '/', '*', '='].includes(key)) {
        handleOperator(key);
    } else if (key === 'Backspace') {
        num1 = 0;
        num2 = 0;
        operator = '';
        displayValue = '';
        updateDisplay();
    } else if (key === 'Enter') {
        handleOperator('=')
    }
})

document.querySelector('.button-clear').addEventListener('click', () => {
    changeColorBack();
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

operators.forEach((btn) => {btn.addEventListener('click', (e) => {
    if (displayValue === '') {
        return;
    }
    if (btn.id === 'evaluate') {
        changeColorBack();

        if(!operator || !num1 ) {
            return;
        }
        evaluate();
        return;
    }
    if (operator !== '') {
        evaluate();
    }
    changeColorBack();
    operator = e.target.textContent;
    num1 = displayValue;
    updateDisplay();
    displayValue = '';
    btn.style.backgroundColor = '#555'
    elemToChangeBack = btn;
    
})});

