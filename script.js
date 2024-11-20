document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    const display = document.querySelector('.display input');
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                display.value = currentInput;
            } else if (value === '+' || value === '-' || value === '*' || value === '/') {
                currentInput += ` ${value} `;
                display.value = currentInput;
            } else if (value === '=') {
                display.value = evaluateExpression(currentInput);
                currentInput = display.value;
            } else if (value === 'C') {
                currentInput = '';
                display.value = '0';
            } else if (value === '⌫') { // Delete button
                currentInput = currentInput.trim();
                if (currentInput.endsWith(' ')) {
                    currentInput = currentInput.slice(0, -3);
                } else {
                    currentInput = currentInput.slice(0, -1);
                }
                display.value = currentInput || '0';
            }
        });
    });

    function evaluateExpression(expression) {
        try {
            return new Function('return ' + expression)();
        } catch (e) {
            return 'Error';
        }
    }
});
