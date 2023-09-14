// TODO: 
// enable power button, set default display as "0"
// enable a second sum to be performed with total from first as starting number
// functionality backspace & decimal point buttons 
let operator = '';
let num1 = 0;
let num2 = 0;
let total = 0;
let displayValue = '';
let isOperatorPressed = false;
let currentDisplay = "";
let isPowerOn = false;

const operatorKeys = document.querySelectorAll('.op_btn');
const numberKeys = document.querySelectorAll('.num_btn');
const clearButton = document.getElementById('btn_clr');
const equalButton = document.getElementById('equals');
const pwrButton = document.getElementById("pwr_btn");

// adds basic maths operations 
const add = (num1, num2) => {
  console.log(num1);
  console.log(num2);
  total = num1 + num2;
  console.log(total);
  return total;
}

const subtract = (a, b) => {
  console.log(num1);
  console.log(num2);
  total = a - b;
  console.log(total);
  return total;
}

const multiply = (a, b) => {
  console.log(num1);
  console.log(num2);
  total = a * b;
  console.log(total);
  return total;
}

const divide = (a, b) => {
  console.log(num1);
  console.log(num2);
  total = a / b;
  console.log(total);
  return total;
}

// calls appropriate basic maths functions according to operator 
function operate(num1, operator, num2) {
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === 'X') {
    return multiply(num1, num2);
  } else if (operator === '/') {
    if (num1 === 0) {
      return 0
    } else {
      return divide(num1, num2);
    }
  }
}

//  sets behaviour onclick for any number button user clicks on 
for (let i = 0; i < numberKeys.length; i++) {
  numberKeys.item(i).addEventListener('click', e => updateDisplay(e));
}

//  sets behaviour onclick for any operator button user clicks on 
for (let i = 0; i < operatorKeys.length; i++) {
  operatorKeys.item(i).addEventListener('click', e => handleOperator(e));
}

//  sets behaviour onclick when user clicks on equals button 
equals.addEventListener('click', e => handleEquals(e));

// sets behaviour onClick when user clicks on CE button
clearButton.addEventListener("click", e => handleClear(e));

// sets behaviour onClick when user clicks on PWR button
pwrButton.addEventListener("click", e => handlePWR(e));

function handlePWR(e) {
  if (isPowerOn) {
    displayValue = "";
    document.getElementById("disp").textContent = "";
    // additional code to disable other buttons and functionality 
  } else {
    displayValue = "0";
    document.getElementById("disp").textContent = displayValue;
  }
  // toggle on off state 
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
  //sets display to zero for use with currentDisplay flag
  displayValue = "0";
  document.getElementById("disp").textContent = displayValue;
}

// saves numbers to global variables, renders numbers to display_container
// sets display to zero after handleClear() called 
function updateDisplay(e) {
  if (!isPowerOn) return;
  currentDisplay = document.getElementById("disp").textContent;

  if (isOperatorPressed && currentDisplay.match(/[\+|\-|\X|\/]\d*/)) {
    currentDisplay = '';
  }
  if (currentDisplay === "0") {
    displayValue = e.target.textContent;
  } else {
    displayValue = currentDisplay + e.target.textContent;
  }
  // update display
  document.getElementById("disp").textContent = displayValue;
  // update num1 or num2
  if (isOperatorPressed) {
    num2 = parseFloat(displayValue);
  } else {
    num1 = parseFloat(displayValue);
  }
}

//saves operator to global variables, renders operator to display_container
function handleOperator(e) {
  if (!isPowerOn) return;
  num1 = parseFloat(displayValue);
  displayValue = e.target.textContent;
  document.getElementById("disp").textContent = displayValue;
  operator = e.target.textContent;
  isOperatorPressed = true;
}

// calls operate() when equals button clicked
// renders value returned to display_container 
function handleEquals(e) {
  if (!isPowerOn) return;
  document.getElementById('disp').textContent = operate(num1, operator, num2);
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

runTests();



