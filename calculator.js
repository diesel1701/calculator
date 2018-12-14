
const display = document.querySelector('.display');
const key = document.querySelectorAll('button');

display.textContent = 0;

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
  
  // check the key for class=operator
  if([...e.srcElement.classList].includes('operator')) {
    if(operator === null) {
      opKeyPress();
    } else {
      let result = operate(+value1, operator, +holder);
      display.textContent = result;
      opKeyPress();
      value1 = result;
    }
  } else if([...e.srcElement.classList].includes('number')){
    holder += e.target.textContent;
    charLimit();
    display.textContent = holder;
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

  function opKeyPress() {
    if(holder === '') {
      operator = e.srcElement.classList[1];
    } else {
      operator = e.srcElement.classList[1];
      value1 = holder;
      holder = '';
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