
const display = document.querySelector('.display');
const calcBtn = document.querySelectorAll('button');

calcBtn.forEach(x => x.addEventListener('click', (e) => {
  let clickInput = e.srcElement;
  keyPress(clickInput);
}));
window.addEventListener('keyup', (e) => {
  [...calcBtn].forEach(function(kbdInput) {
    if(kbdInput.dataset.key === e.key) {
      keyPress(kbdInput)
    }
  })
});

// storing numbers and operators
let holder = '';
let value1 = '';
let operator = null;

function keyPress(input) {

  clearKey();
  backspace();
  evaluateEqual();
  evaluateOp();
  evaluateNum();
  
  function evaluateOp() {
    if([...input.classList].includes('operator')) {
      if(divideByZero()) {
        return;
      } else if(operator === null || operator === 'equal') {
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
      operator = input.classList[1];
    } else {
      operator = input.classList[1];
      value1 = holder;
      holder = '';
    }
  }
  
  function evaluateNum() {
    if([...input.classList].includes('number')) {
      holder += input.textContent;
      charLimit();
      decimalCheck();
      display.textContent = holder;
    }
  }

  function evaluateEqual() {
    if([...input.classList].includes('equal')){
      if(holder === '' || value1 === ''){
        return;  // stops operation when values are undefined
      } else if(divideByZero()) {
        return; // stops operation
      } else {
        result = operate(+value1, operator, +holder);
        operator = 'equal';
        display.textContent = displayResult(result);
        holder = '';
        value1 = result;
      }
    }
  }

  function displayResult(num) {
    if(num.toString().includes('.')) {
      return (+result.toPrecision(8));
    } else {
      return (+result.toPrecision(9));
    }
  }

  function decimalCheck() {
    if([...input.classList].includes('decimal') && holder.substr(0, holder.length - 1).includes('.')) {
      holder = holder.substr(0, holder.length - 1);
    }
  }

  function divideByZero() {
    if(operator === 'divide' && +holder === 0) {
      operator = null;
      holder = '';
      alert('No dividing by zero, please!');
      return true;
    }
  }

  function charLimit() {
    holder = holder.substr(0, 9);
  }

  function clearKey() {
    if([...input.classList].includes('clear')) {
      holder = '';
      value1 = '';
      operator = null;
      display.textContent = 0;
    }
  }

  function backspace() {
    if([...input.classList].includes('backspace')) {
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