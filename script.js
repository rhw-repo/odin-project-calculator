// TODO: 
// modify functionality decimal button to avoid floating point calculations
let operator = '';
let num1 = 0;
let num2 = 0;
let total = 0;
let displayValue = '';
let isOperatorPressed = false;
let isPowerOn = false;
let isEqualsPressed = false;

const operatorKeys = document.querySelectorAll('.op_btn');
const numberKeys = document.querySelectorAll('.num_btn');
const clearButton = document.getElementById('btn_clr');
const equalButton = document.getElementById('equals');
const pwrButton = document.getElementById("pwr_btn");
const backspaceButton = document.getElementById("btn_backspace")

// Maths operations
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

// Event Listeners for Keys
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

// enables key to delete last one number or operator by calling xxxxx()
backspaceButton.addEventListener('click', e => handleBackspace(e));

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
  // toggle the calculator's power state between 
  // "on" & "off" when PWR button clicked
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

function handleBackspace(e) {
  if (!isPowerOn || isEqualsPressed) return;

  // prevent removal of default zero following use of PWR / CE button
  if (displayValue === "0") {
    return;
  }
  // if the last char is an operator, remove it.
  if (isOperatorPressed) {
    // reassign num1 to displayValue 
    displayValue = num1.toString();
    // reset the operator  
    operator = "";  
    // update 'flag' that tracks whether an operator has been used
    isOperatorPressed = false;  
  } else {
    // remove the last number or decimal point from displayValue
    displayValue = displayValue.slice(0, -1);
  }
  // update the display
  document.getElementById("disp").textContent = displayValue;
  // update num1 or num2 based on the current value of operator
  if (operator) {
    num2 = parseFloat(displayValue);
  } else {
    num1 = parseFloat(displayValue);
  }
}

// checks if calculator "turned on", exits if not
// responds to user inputs to update display, 
// based on user input & current state 
function updateDisplay(e) {
  if (!isPowerOn) return;
  isEqualsPressed = false;

  // checking if limitation of input to 8 characters max is working
  console.log("Display Value Length:", displayValue.length);
  console.log("Display Value:", displayValue);

  // limit input to 8 chars max 
  if (displayValue.length >= 8) {
    return;
  }

  if (isOperatorPressed) {
    displayValue = '';
    // resets state of isOperatorPressed ready for next inputs
    isOperatorPressed = false;
  }
  // prevent 0 from being leading digit
  if (displayValue === '0' || displayValue === 'Err') {
    displayValue = e.target.textContent;
  } else {
    // if displayValue not "0" or "Error" append to current displayValue 
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

  isEqualsPressed = false;

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
  displayValue = operator;
  document.getElementById("disp").textContent = displayValue;
}

// called in handleEquals() to limit display of calculation(s) to 8 characters
function roundForDisplay(num) {
  let string = num.toString();
  if (string.length > 8) {
    return parseFloat(num.toFixed(8 - string.indexOf("."))).toString();
  } else {
    return string;
  }
}

// when equals button clicked, checks if calculator is "turned on", if so - 
// completes calculation, updates display, prepares for any further operations 
function handleEquals(e) {
  if (!isPowerOn) return;

  // perform calculation if first number and operator are defined
  if (num1 && operator) {
    num2 = parseFloat(displayValue);
    total = operate(num1, operator, num2);
    // rounds off display of total if exceeds 8 characters  
    let displayTotal = roundForDisplay(total);
    displayValue = displayTotal;
    document.getElementById("disp").textContent = displayTotal;

    isEqualsPressed = true;

    // retain original (full precision) total for any further calculations
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

