// TODO: possibly add keyboard support 
let operator = "";
let num1 = 0;
let num2 = 0;
let total = 0;
let displayValue = "";
let isOperatorPressed = false;
let isPowerOn = false;
let isEqualsPressed = false;

const operatorKeys = document.querySelectorAll(".op_btn");
const numberKeys = document.querySelectorAll(".num_btn");
const clearButton = document.getElementById("btn_clr");
const equalButton = document.getElementById("equals");
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
  if (num2 === 0) {
    return "Really?";
  }
  console.log(num1);
  console.log(num2);
  total = num1 / num2;
  console.log(total);
  return total;
}

// calls appropriate basic maths function according to operator 
function operate(num1, operator, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "X") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    if (num1 === 0 || num2 === 0) {
      return "Really?"
    } else {
      return divide(num1, num2);
    }
  }
}

// Event Listeners for Keys
// enables key to append number key value to display when clicked 
for (let i = 0; i < numberKeys.length; i++) {
  numberKeys.item(i).addEventListener("click", e => updateDisplay(e));
}
// enables key to append operator key value to display when clicked 
for (let i = 0; i < operatorKeys.length; i++) {
  operatorKeys.item(i).addEventListener("click", e => handleOperator(e));
}
//  enables key to equate the sum when clicked by calling handleEquals()
equals.addEventListener("click", e => handleEquals(e));

// enables key to clear all values and the display by calling handleClear()  
clearButton.addEventListener("click", e => handleClear(e));

// enables key to delete last one character by calling handleBackspace()
backspaceButton.addEventListener("click", e => handleBackspace(e));

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
    // update "flag" that tracks whether an operator has been used
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

// updates display based on input & currrent state
// first checks if calculator "turned on", exits if not
function updateDisplay(e) {
  if (!isPowerOn) return;
  isEqualsPressed = false;
  // limits input to one decimal point per number
  if (e.target.textContent === "." && displayValue.includes(".")) {
    return;
  }

  // checking if limitation of input to 8 characters max is working
  console.log("Display Value Length:", displayValue.length);
  console.log("Display Value:", displayValue);

  // limit input to 8 chars max 
  if (displayValue.length >= 8) {
    return;
  }

  if (isOperatorPressed) {
    displayValue = "";
    // resets state of isOperatorPressed ready for next inputs
    isOperatorPressed = false;
  }
  // prevent 0 from being leading digit
  if (displayValue === "0" || displayValue === "Error") {
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
    return num.toExponential(4); 
  } else {
    return string;
  }
}

// when equals button clicked, checks if calculator is "turned on", if so - 
// completes calculation, updates display, prepares for any further operations 
function handleEquals(e) {
  if (!isPowerOn) return;

  // perform calculation if first number and operator are defined
  if (num1 !== null && operator) {
    num2 = parseFloat(displayValue);

    // check if num1 or num2 are not valid numbers
    if (
      num1 === null ||
      operator === null ||
      num2 === null ||
      isNaN(num1) ||
      isNaN(num2)
    ) {
      document.getElementById("disp").textContent = "Error";
      return;
    }

    total = operate(num1, operator, num2);
    console.log("Internal total: " + total)
    // handles specific "Really?" error message for division with 0
    if (typeof total === "string") {
      document.getElementById("disp").textContent = total;
      return;
    }

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
    // convert total to string for consistent handling of display values
    // and calculations (example: floating point calculations)
    displayValue = total.toString();
  } else {
    document.getElementById("disp").textContent = "Error";
  }
}



