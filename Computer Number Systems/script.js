// Get references to the HTML elements
const numberInput = document.getElementById('numberInput');
const fromBaseInput = document.getElementById('fromBaseInput');
const toBaseInput = document.getElementById('toBaseInput');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

// Function to check if the input number is valid for the given base
function isValidForBase(number, base) {
    // Create a regular expression to validate the digits
    // For example, in base 16, characters can be 0-9 and A-F.
    const validChars = "0123456789abcdefghijklmnopqrstuvwxyz".substring(0, base);
    const regex = new RegExp(`^[${validChars}]+$`, 'i');
    return regex.test(number);
}

// Add a click event listener to the button
convertBtn.addEventListener('click', () => {
    // Get the values from the input fields
    const numberStr = numberInput.value.trim();
    const fromBase = parseInt(fromBaseInput.value);
    const toBase = parseInt(toBaseInput.value);

    // Clear previous error styling
    resultDiv.classList.remove('error');

    // --- Input Validation ---
    if (!numberStr || !fromBase || !toBase) {
        resultDiv.textContent = 'Error: All fields are required.';
        resultDiv.classList.add('error');
        return;
    }
    if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
        resultDiv.textContent = 'Error: Bases must be between 2 and 36.';
        resultDiv.classList.add('error');
        return;
    }
    if (!isValidForBase(numberStr, fromBase)) {
        resultDiv.textContent = `Error: "${numberStr}" is not a valid number for base ${fromBase}.`;
        resultDiv.classList.add('error');
        return;
    }

    // --- Conversion Logic ---
    try {
        // 1. Parse the number from its original base to a base-10 integer.
        const decimalValue = parseInt(numberStr, fromBase);

        // 2. Convert the base-10 integer to the target base string representation.
        const result = decimalValue.toString(toBase).toUpperCase();
        
        // Display the result
        resultDiv.textContent = result;
    } catch (e) {
        resultDiv.textContent = 'An unexpected error occurred during conversion.';
        resultDiv.classList.add('error');
    }
});