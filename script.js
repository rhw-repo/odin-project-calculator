// TODO: 
// test functionality for subsequent operations and those using decimals 
// functionality backspace button ("C" button) 
let operator = '';
let num1 = 0;
let num2 = 0;
let total = 0;
let displayValue = '';
let isOperatorPressed = false;
let isPowerOn = false;

const operatorKeys = document.querySelectorAll('.op_btn');
const numberKeys = document.querySelectorAll('.num_btn');
const clearButton = document.getElementById('btn_clr');
const equalButton = document.getElementById('equals');
const pwrButton = document.getElementById("pwr_btn");

// basic maths operations called by operate()
const add = (num1, num2) => {
  console.log(num1);
  console.log(num2);
  total = num1 + num2;
  console.log(total);
  return total;
}

const subtract = (num1, num2) => {
  console.log(num1);
  console.log(num2);
  total = num1 - num2;
  console.log(total);
  return total;
}

const multiply = (num1, num2) => {
  console.log(num1);
  console.log(num2);
  total = num1 * num2;
  console.log(total);
  return total;
}

const divide = (num1, num2) => {
  console.log(num1);
  console.log(num2);
  total = num1 / num2;
  console.log(total);
  return total;
}

// calls appropriate basic maths function according to operator 
function operate(num1, operator, num2) {
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === 'X') {
    return multiply(num1, num2);
  } else if (operator === '/') {
    if (num1 === 0) {
      return "Don't B Daft"
    } else {
      return divide(num1, num2);
    }
  }
}

// enables key to append number key value to display when clicked 
for (let i = 0; i < numberKeys.length; i++) {
  numberKeys.item(i).addEventListener('click', e => updateDisplay(e));
}
// enables key to append operator key value to display when clicked 
for (let i = 0; i < operatorKeys.length; i++) {
  operatorKeys.item(i).addEventListener('click', e => handleOperator(e));
}
//  enables key to equate the sum when clicked by calling handleEquals()
equals.addEventListener('click', e => handleEquals(e));

// enables key to clear all values and the display by calling handleClear()  
clearButton.addEventListener("click", e => handleClear(e));

// enables key to simulate "power on & off" by calling handlePWR()
pwrButton.addEventListener("click", e => handlePWR(e));

// simulates "power on & off" by only enabling input & display if "on"
function handlePWR(e) {
  if (isPowerOn) {
    displayValue = "";
    document.getElementById("disp").textContent = "";
    // else disable other buttons and functionality 
  } else {
    displayValue = "0";
    document.getElementById("disp").textContent = displayValue;
  }
  // toggle state by assigning "off" state to "on" on after clicking PWR button
  isPowerOn = !isPowerOn;
}

// resets the variables to zero to clear the last input
function handleClear(e) {
  if (!isPowerOn) return;
  num1 = 0;
  console.log(num1);
  num2 = 0;
  console.log(num2);
  total = 0;
  console.log(total);
  isOperatorPressed = false;
  console.log(isOperatorPressed);
  displayValue = "0";
  document.getElementById("disp").textContent = displayValue;
}

// checks if calculator "turned on", exits if not
// responds to user inputs to update display, 
// based on user input & current state 
function updateDisplay(e) {
  if (!isPowerOn) return;
  if (isOperatorPressed) {
    displayValue = '';
    // resets state of isOperatorPressed ready for next inputs
    isOperatorPressed = false;
  }
  // prevent 0 from being leading digit
  if (displayValue === '0' || displayValue === 'Err') {
    displayValue = e.target.textContent;
  } else {
    // if displayValue not "0" or "Err" append to current displayValue 
    displayValue += e.target.textContent;
  }
  // updates display container content
  document.getElementById("disp").textContent = displayValue;
  // update num1 or num2 based on whether an operator is currently selected
  if (operator) {
    num2 = parseFloat(displayValue);
  } else {
    num1 = parseFloat(displayValue);
  }
}

// enables handling of plus, minus, subtract and divide operators 
function handleOperator(e) {
  if (!isPowerOn) return;
// check for existing calculation, if so -
// finalize that calculation and prepare for a new operation 
  if (num1 && operator) {
    num2 = parseFloat(displayValue);
    total = operate(num1, operator, num2);
    num1 = total;
    num2 = 0;
    isOperatorPressed = true;
  } else {
    num1 = parseFloat(displayValue);
    isOperatorPressed = true;
  }
// assigns operator to displayValue to render to display_container
  operator = e.target.textContent;
  isOperatorPressed = true;
  displayValue=  operator;
  document.getElementById("disp").textContent = displayValue;
}

// when equals button clicked, checks if calculator is "turned on", if so - 
// completes calculation, updates display, prepares for any further operations 
function handleEquals(e) {
  if (!isPowerOn) return;

  if (num1 && operator) {
    num2 = parseFloat(displayValue);
    total = operate(num1, operator, num2);
    document.getElementById("disp").textContent = total;
    num1 = total;
    num2 = 0;
    operator = null;
    isOperatorPressed = true; 
    // convert total to string for consistent handling of dislay values
    // and calculations (example: floating point calculations)
    displayValue = total.toString(); 
  } else {
    document.getElementById("disp").textContent = "Error";
  }
}


// Adds tests in development phase 

// Test cases
function runTests() {
  let passed = true;

  // Test for add
  if (add(2, 3) !== 5) {
    console.log('Failed: Add');
    passed = false;
  }

  // Test for subtract
  if (subtract(5, 3) !== 2) {
    console.log('Failed: Subtract');
    passed = false;
  }

  // Test for multiply
  if (multiply(2, 3) !== 6) {
    console.log('Failed: Multiply');
    passed = false;
  }

  // Test for divide
  if (divide(6, 3) !== 2) {
    console.log('Failed: Divide');
    passed = false;
  }

  // Test for divide by zero
  if (divide(6, 0) !== Infinity) {
    console.log('Failed: Divide by zero');
    passed = false;
  }

  // Test for operate function
  if (operate(3, '+', 4) !== 7) {
    console.log('Failed: Operate add');
    passed = false;
  }

  if (operate(7, '-', 3) !== 4) {
    console.log('Failed: Operate subtract');
    passed = false;
  }

  if (operate(3, 'X', 2) !== 6) {
    console.log('Failed: Operate multiply');
    passed = false;
  }

  if (operate(8, '/', 4) !== 2) {
    console.log('Failed: Operate divide');
    passed = false;
  }

  if (passed) {
    console.log('All tests passed!');
  } else {
    console.log('Some tests failed.');
  }
}

// Run the tests
runTests();



