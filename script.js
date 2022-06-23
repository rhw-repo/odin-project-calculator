let register0 = 0;
let operator = '';
let result = operate();
let num1 = ' ';
console.log(num1);
let num2 = ' ';
console.log(num2);

// adds maths operations 
const add = (num1, num2) => {
  console.log(num1);
  console.log(num2);
  let total = num1 + num2;
  console.log(total);
  return total;
}

//add(2, 4);

const subtract = (num1, num2) => {
  let total = num1 - num2;
  console.log(total);
  return total;
}

//subtract(6, 4);

const multiply = (num1, num2) => {
  let total = num1 * num2;
  console.log(total);
  return total;
}

//multiply(2, 4);

const divide = (num1, num2) => {
  let total = num1 / num2;
  console.log(total);
  return total;
}

//divide(6, 3);

function operate(operator, num1, num2) {
  if (operator === '+') {
    return add();
  } else if (operator === '-') {
    return subtract();
  } else if (operator === '*') {
    return multiply();
  } else if (operator === '/') {
    /*if (y === 0) { 
    return 0} else { */
    return divide();
  }
}

//operate(add);

const displayOperator = document.querySelectorAll('.op_btn');

for (let i = 0; i < displayOperator.length; i++) {
  displayOperator.item(i).addEventListener('click', () => {
    register0 = document.getElementById('disp').textContent;
    // displays operator
    document.getElementById('disp').textContent = document.getElementById('disp').textContent + displayOperator.item(i).textContent;
  })
}

const displayNumbers = document.querySelectorAll('.num_btn');
for (let i = 0; i < displayNumbers.length; i++) {
  displayNumbers.item(i).addEventListener('click', () => {
    register0 = document.getElementById('disp').textContent;
    document.getElementById('disp').textContent = document.getElementById('disp').textContent + displayNumbers.item(i).textContent;
  })
}
