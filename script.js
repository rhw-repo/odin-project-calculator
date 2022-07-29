 // The Odin Project Calculator Project - script.js to experiment with using an approach using data attributes

 
 // need to know when a key is pressed and which one it is
 // need to listen for key being pressed, uses event delegation 
 const calculator = document.querySelector(".calc_container");
 const allTheButtons = document.querySelectorAll(".calculator_keys button");
 const display = document.querySelector('.display_container');
 
 console.log(allTheButtons.length);
 // do not add parentheses to the name of the function within the eventListener, to avoid calling it there
 //object(variable).method(event, function to call WITHOUT PARENTHESES, or anonymous function)

 for (i = 0; i < allTheButtons.length; i++) {
   allTheButtons[i].addEventListener("click", displayTheThing);
 }

 function displayTheThing(e) {
 const key = document.querySelectorAll('.calculator_keys button');
 const action = key.dataset.action;
   console.log(e.button);
   document.getElementById('disp');
   disp.textContent = key;
   disp.append(key);

   if (
     action === 'add' ||
     action === 'subtract' ||
     action === 'multiply' ||
     action === 'divide'
   ) {
     console.log('operator key!')
   }

   if (action === 'decimal') {
     console.log('decimal key!')
   }

   if (action === 'clear') {
     console.log('clear key!')
   }

   if (action === 'calculate') {
     console.log('equal key!')
   }

   if (!action) {
     console.log("number key!");
   }
 }

 // 'WORKING OUT NOTES AREA '... ideas, quick lines of syntax to be fixed, etc: 

 //const key = e.target;
 //const action = key.dataset.action

 /*keys.addEventListener('click', (e) => {
   console.log('A button was clicked');
   const keyContent = key.textContent;
  // if (e.target.matches('button')) {
     display_container.textContent = keyContent;
     display_container.append(keyContent);
   }
 })

 // no data-action attribute, pressed key is a number key 
 if (!action) {
   console.log("number key!");
 }

 /* if key had data-action that is either add, subtract, multiply or divide
  then pressed key is an operator

  if key had data-action:
 "decimal", pressed key is the decimal point
 data-action "clear", is clear button
 data-action is "calculate", is equals key
 

 if (
   action === 'add' ||
   action === 'subtract' ||
   action === 'multiply' ||
   action === 'divide'
 ) {
   console.log('operator key!')
 }

 if (action === 'decimal') {
   console.log('decimal key!')
 }

 if (action === 'clear') {
   console.log('clear key!')
 }

 if (action === 'calculate') {
   console.log('equal key!')
 }

 /* next steps: complete

 const display = document.querySelector('.display_container');
 keys.addEventListener('click', e => {
   if (e.target.matches('button')) {
     const key = e.target;
    // error action is not defined 
    const action = key.dataset.action;
     const keyContent = key.textContent;
     const displayedNum = display_container.textContent;
     
   }
 })
 
 if (action === 'decimal') {
   display_container.textContent = displayedNum + '.'
 }
 */
