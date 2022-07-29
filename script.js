let operator = '';
let num1 = 0;
let num2 = 0;
let total = 0;
let displayValue = '';
let isOperatorPressed = false;

const operatorKeys = document.querySelectorAll('.op_btn');
const numberKeys = document.querySelectorAll('.num_btn');
const clearButton = document.getElementById('btn_clr');
const equalButton = document.getElementById('equals');



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



// saves numbers to global variables, renders numbers to display_container
function updateDisplay(e) {
  if (isOperatorPressed && document.getElementById("disp").textContent.match(/[\+|\-|\X|\/]\d*/)) {
    document.getElementById("disp").textContent = '';
  }
  displayValue = document.getElementById("disp").textContent + e.target.textContent;
  document.getElementById("disp").textContent = displayValue;
  if (isOperatorPressed) {
    num2 = parseFloat(displayValue);
  } else {
    num1 = parseFloat(displayValue);
  }
}

//saves operator to global variables, renders operator to display_container
function handleOperator(e) {
  num1 = parseFloat(displayValue);
  displayValue = e.target.textContent;
  document.getElementById("disp").textContent = displayValue;
  operator = e.target.textContent;
  isOperatorPressed = true;
}

// calls operate() when equals button clicked, renders value returned to display_container 
function handleEquals(e) {
  document.getElementById('disp').textContent = operate(num1, operator, num2);
}

// next steps: 
//enable a second sum to be performed 
// complete the HTML layout, restyle the title, finish layout HTML, CSS 