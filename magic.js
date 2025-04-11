document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.querySelector('.display-content');
    const buttonsContainer = document.querySelector('.calculator-buttons');

    buttonsContainer.addEventListener('click', (event) => {
        // Ensure the click was directly on a button
        if (!event.target.matches('button')) {
            return;
        }

        const button = event.target;
        const action = button.dataset.action;
        const value = button.dataset.value;
        const operator = button.dataset.operator;
        const displayedNum = displayElement.textContent;

        console.log('--- Button Clicked ---');
        console.log('Button Text:', button.textContent);
        if (value) console.log('Type: Number, Value:', value);
        if (operator) console.log('Type: Operator, Value:', operator);
        if (action) console.log('Type: Action, Value:', action);
        console.log('Current Display:', displayedNum);
        console.log('----------------------');


        // --- Placeholder for Calculator Logic ---
        // Here you would add the code to:
        // - Update the display when numbers are clicked.
        // - Handle operators (+, -, *, /).
        // - Perform calculations when '=' is clicked.
        // - Implement AC (All Clear), +/- (Negate), % (Percent), BS (Backspace).
        // - Manage state (first number, operator, second number).

        // Example: Append number (very basic, needs more logic)
        if (value) {
            if (displayedNum === '0') {
                displayElement.textContent = value;
            } else {
                // Add limits to display length if needed
                displayElement.textContent += value;
            }
        }

        // Example: Clear (very basic)
        if (action === 'clear') {
            displayElement.textContent = '0';
            // Reset other calculator states here
        }

        // Add more logic for other buttons (operators, actions, etc.)
        // ...

    });
});