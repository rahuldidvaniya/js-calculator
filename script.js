// Function 
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
    if (num2 === 0) {
        alert("Error: Division by 0");
        return null;
    }
    return num1 / num2;
}

function percentage(num) {
    return num / 100;
}

function toggleSign(num) {
    return -num;
}

function operate(firstValue, operator, secondValue) {
    switch (operator) {
        case '+':
            return add(firstValue, secondValue);
        case '-':
            return subtract(firstValue, secondValue);
        case '*':
            return multiply(firstValue, secondValue);
        case '/':
            return divide(firstValue, secondValue);
        default:
            return null;
    }
}

const display = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');
let firstValue = '';
let operator = '';
let secondValue = '';
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('num') || button.classList.contains('dot')) {
            if (shouldResetDisplay) {
                display.textContent = '';
                shouldResetDisplay = false;
            }
            if (button.classList.contains('dot')) {
                if (!display.textContent.includes('.')) {
                    display.textContent += value;
                }
            } else {
                display.textContent += value;
            }
        } else if (button.classList.contains('operator')) {
            
            document.querySelectorAll('.operator').forEach(op => op.classList.remove('active'));

            if (firstValue && operator && display.textContent) {
                secondValue = display.textContent;
                firstValue = operate(parseFloat(firstValue), operator, parseFloat(secondValue)).toString();
                display.textContent = firstValue;
                secondValue = '';
            }
            operator = value;
            firstValue = display.textContent;
            
            // Add 'active' class to the clicked operator
            button.classList.add('active');
            shouldResetDisplay = true;
        } else if (button.classList.contains('equalTo')) {
            if (firstValue && operator && display.textContent) {
                secondValue = display.textContent;
                const result = operate(parseFloat(firstValue), operator, parseFloat(secondValue));
                if (result !== null) {
                    display.textContent = Math.round(result * 100) / 100; // Round result to 2 decimal places
                }
                firstValue = '';
                operator = '';
                secondValue = '';
                shouldResetDisplay = true;
            }
        } else if (button.classList.contains('AC')) {
            display.textContent = '0';
            firstValue = '';
            operator = '';
            secondValue = '';
            // Remove 'active' class from all operators
            document.querySelectorAll('.operator').forEach(op => op.classList.remove('active'));
        } else if (button.classList.contains('plus/minus')) {
            display.textContent = toggleSign(parseFloat(display.textContent)).toString();
        } else if (button.classList.contains('percentage')) {
            display.textContent = percentage(parseFloat(display.textContent)).toString();
        }
    });
});
