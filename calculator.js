
const display = document.querySelector('.display');
const key = document.querySelectorAll('button');

key.forEach(x => x.addEventListener('click', keyPress));
// window.addEventListener('keydown', keyPress);
// window event listener currently returning textContent of all elements on page

// storing numbers and operators
let holder = '';
let value1 = '';
let operator = null;

function keyPress(e) {

  // check added for the window event listner
  // ignores any keys not used by the calculator
  if(!key) {
    return;
  }

  clearKey();
  backspace();
  evaluateEqual();
  evaluateOp();
  evaluateNum();
  
  // check the key for class=operator
  function evaluateOp() {
    if([...e.srcElement.classList].includes('operator')) {
      if(operator === null || operator === 'equal') {
        opKeyPress();
      } else {
        result = operate(+value1, operator, +holder);
        display.textContent = displayResult(result);
        opKeyPress();
        value1 = result;
      }
    }
  }

  function opKeyPress() {
    if(holder === '') {
      operator = e.srcElement.classList[1];
    } else {
      operator = e.srcElement.classList[1];
      value1 = holder;
      holder = '';
    }
  }
  
  function evaluateNum() {
    if([...e.srcElement.classList].includes('number')) {
      holder += e.target.textContent;
      charLimit();
      decimalCheck();
      display.textContent = holder;
    }
  }

  console.log(`key pressed: ${e.target.textContent}`, `holder: ${holder}`, `operator: ${operator}`, `value1: ${value1}`);

  function evaluateEqual() {
    if([...e.srcElement.classList].includes('equal')) {
      result = operate(+value1, operator, +holder);
      operator = 'equal';
      display.textContent = displayResult(result);
      holder = '';
      value1 = result;
    }
  }

  function displayResult(num) {
    if(num.toString().length > 10) {
      return (+result.toPrecision(5)).toExponential();
    } else {
      return (+result.toPrecision(10));
    }
  }

  function decimalCheck() {
    if([...e.srcElement.classList].includes('decimal') && holder.substr(0, holder.length - 1).includes('.')) {
      holder = holder.substr(0, holder.length - 1);
    }
  }

  function charLimit() {
    holder = holder.substr(0, 9);
  }

  function clearKey() {
    if([...e.srcElement.classList].includes('clear')) {
      holder = '';
      value1 = '';
      operator = null;
      display.textContent = 0;
    }
  }

  function backspace() {
    if([...e.srcElement.classList].includes('backspace')) {
      holder = holder.substr(0, holder.length - 1);
      display.textContent = holder;
    }
  }
}

function operate(x, operator, y) {
  switch(operator) {
    case 'add':
      return add(x, y);
    case 'subtract':
      return subtract(x, y);
    case 'multiply':
      return multiply(x, y);
    case 'divide':
      return divide(x, y);
    default:
      break;

  }
}

function add(x, y) {
	return x + y;	
}

function subtract(x, y) {
	return x - y;	
}

function multiply(x, y) {
	return x * y;	
}

function divide(x, y) {
	return x / y;
}