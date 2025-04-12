document.addEventListener('DOMContentLoaded', () => {
    const displayContentElement = document.querySelector('.display-content');
    const buttons = document.querySelectorAll('.button');

    let currentInput = '0'; // The number currently being typed
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false; // Flag: True after an operator is pressed

    function updateDisplay() {
        displayContentElement.textContent = currentInput;
    }

    function performCalculation() {
        const first = parseFloat(firstOperand);
        const second = parseFloat(currentInput);
        if (isNaN(first) || isNaN(second)) return NaN; // Or handle error

        switch (operator) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/':
                if (second === 0) {
                    return 'Error'; // Division by zero
                }
                return first / second;
            default: return second; // Should not happen with binary ops
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            // --- Number Input ---
            if (button.classList.contains('number')) {
                if (waitingForSecondOperand) {
                    currentInput = buttonText;
                    waitingForSecondOperand = false;
                } else {
                    currentInput = currentInput === '0' ? buttonText : currentInput + buttonText;
                }
            }
            // --- Decimal Point ---
            else if (buttonText === '.') {
                if (waitingForSecondOperand) { // Start new number after operator
                    // If we just pressed an operator, pressing '.' starts '0.'
                    currentInput = '0.';
                    waitingForSecondOperand = false; // We are now typing the second operand
                } else if (!currentInput.includes('.')) {
                   // *** This is the crucial check ***
                   // Only add '.' if the currentInput string DOES NOT already include one.
                   currentInput += '.';
                }
                // If currentInput already includes '.', this block does nothing.
           }
            // --- Operators (+, -, *, /) ---
            else if (button.classList.contains('function') && ['+', '-', '*', '/'].includes(buttonText)) {
                if (operator !== null && !waitingForSecondOperand) {
                    // Handle chained operations: 5 + 3 * => calculate 5+3 first
                    const result = performCalculation();
                    currentInput = String(result);
                    firstOperand = result; // Result becomes the new first operand
                } else {
                     // First operator or operator after '='
                     firstOperand = currentInput;
                }

                operator = buttonText;
                waitingForSecondOperand = true; // Ready for the next number
            }
            // --- Equals Button ---
            else if (buttonText === '=') {
                if (operator === null || waitingForSecondOperand) {
                    // Nothing to calculate (e.g., pressed '=' twice, or "5 =" )
                    return;
                }
                const result = performCalculation();
                currentInput = String(result);
                // Reset state for next calculation
                operator = null;
                firstOperand = null; // Or keep result as firstOperand for chaining like hitting '=' repeatedly? Decide on desired behavior.
                waitingForSecondOperand = false; // Ready for new first number
            }
             // --- Action Buttons (AC, BS, +/-, %) ---
             else if (button.classList.contains('action') || ['+/-', '%'].includes(buttonText)) {
                 if (buttonText === 'AC') {
                     currentInput = '0';
                     firstOperand = null;
                     operator = null;
                     waitingForSecondOperand = false;
                 } else if (buttonText === 'BS') {
                     if (waitingForSecondOperand) return; // Don't backspace if waiting for new number
                     currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
                 } else if (buttonText === '+/-') {
                     currentInput = String(parseFloat(currentInput) * -1);
                 } else if (buttonText === '%') {
                     // Percentage logic depends: is it 50 + 10% (of 50)? Or just 50% (0.5)?
                     // Simple version: treat as / 100
                     currentInput = String(parseFloat(currentInput) / 100);
                     // More complex: If operator exists, calculate percentage of firstOperand
                     // if (operator && firstOperand) { currentInput = String(parseFloat(firstOperand) * (parseFloat(currentInput)/100)); }
                 }
            }

            // Update display after every action
            updateDisplay();
            //console.log(`State: first=${firstOperand}, op=${operator}, current=${currentInput}, waiting=${waitingForSecondOperand}`); // Debugging
        });
    });

    // Initialize
    updateDisplay();
});