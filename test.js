const num1 = 50;
const num2 = 55;

const add = (a, b) => {
  console.log(num1);
  console.log(num2);
  let total = a + b;
  console.log(total);
  return total;
}

//add(2, 4);

const subtract = (a, b) => {
  console.log(num1);
  console.log(num2);
  let total = a - b;
  console.log(total);
  return total;
}

//subtract(6, 4);

const multiply = (a, b) => {
  console.log(num1);
  console.log(num2);
  let total = a * b;
  console.log(total);
  return total;
}

//multiply(2, 4);

const divide = (a, b) => {
  console.log(num1);
  console.log(num2);
  let total = a / b;
  console.log(total);
  return total;
}

//divide(6, 3);

function operate(num1, operator, num2) {
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === '*') {
    return multiply(num1, num2);
  } else if (operator === '/') {
    /*if (y === 0) { 
    return 0} else { */
    return divide(num1, num2);
  }
}

operate(num1, '+', num2);
