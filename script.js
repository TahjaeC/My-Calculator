class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
        this.previousOperationTextElement = previousOperationTextElement;
        this.currentOperationTextElement = currentOperationTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number ===
            '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        } else if (this.previousOperand === 'x!' || this.previousOperand === '&#8730;' && this.currentOperand === null) {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    factorial(n) {
        let answer = 1;
        if (n == 0 || n == 1) {
            return answer;
        } else {
            for (var i = n; i >= 1; i--) {
                answer = answer * i;
            }
            return answer;
        }
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        else if (this.operation === '+') {
            computation = prev + current;
            console.log("here");
        } else if (this.operation === '-') {
            computation = prev - current;
        } else if (this.operation === '*') {
            computation = prev * current;
        } else if (this.operation === '/') {
            computation = prev / current;
        } else if (this.operation === 'root') {
            console.log('here');
            computation = Math.sqrt(prev);
        } else if (this.operation === 'factorial') {
            console.log('here');
            computation = factorial(prev);
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperationTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperationTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperationTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperationTextElement = document.querySelector('[data-previous-operand]');
const currentOperationTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay();
})