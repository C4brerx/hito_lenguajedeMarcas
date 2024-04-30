document.addEventListener('DOMContentLoaded', function () {
    const calculator = document.querySelector('#calculator');
    const keys = calculator.querySelector('.calculator-keys');
    const display = calculator.querySelector('#display');
    let firstValue = '';
    let operator = '';
    let awaitingNextValue = false;

    function resetCalculator() {
        firstValue = '';
        operator = '';
        awaitingNextValue = false;
        display.value = '0';
    }

    function calculate() {
        const currentValue = parseFloat(display.value);
        let result = 0;

        switch (operator) {
            case '+':
                result = parseFloat(firstValue) + currentValue;
                break;
            case '-':
                result = parseFloat(firstValue) - currentValue;
                break;
            case '*':
                result = parseFloat(firstValue) * currentValue;
                break;
            case '/':
                result = parseFloat(firstValue) / currentValue;
                break;
            case '%':
                result = parseFloat(firstValue) / 100;
                break;
            case 'x²':
                result = parseFloat(firstValue) * parseFloat(firstValue);
                break;
            case '√':
                result = Math.sqrt(parseFloat(firstValue));
                break;
            default:
                break;
        }

        display.value = result;
        firstValue = result;
        awaitingNextValue = true;
    }

    keys.addEventListener('click', (event) => {
        const { target } = event;

        if (!target.matches('button')) {
            return;
        }

        const { value } = target;

        if (value === 'AC') {
            resetCalculator();
            return;
        }

        if (value === '+' || value === '-' || value === '*' || value === '/' || value === '%' || value === 'x²' || value === '√') {
            operator = value;
            firstValue = display.value;
            awaitingNextValue = true;
            return;
        }

        if (value === '=') {
            if (awaitingNextValue) {
                return;
            }
            calculate();
            return;
        }

        if (awaitingNextValue) {
            display.value = value;
            awaitingNextValue = false;
        } else {
            display.value = display.value === '0' ? value : display.value + value;
        }
    });
});
