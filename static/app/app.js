presentNum = ''
pastNum = ''
Operation = ''

const Current = document.querySelector('.current-number')

const Previous = document.querySelector('.previous-number')

const Equal = document.querySelector('.Calculating-equal-sign')

// Buttons---
const number = document.querySelectorAll('.number')
let operator = document.querySelectorAll('.operator')
const Clear = document.querySelector('.Clear')
const Decimal = document.querySelector('.Decimal')
const Back = document.querySelector('.Back')

// ------------------------------

Back.addEventListener('click', Delete)

window.addEventListener('keydown', KeyPress)

Decimal.addEventListener('click', addDecimal)

Clear.addEventListener('click', () => {
  pastNum = ''
  presentNum = ''
  Operation = ''
  Current.textContent = '0'
  Previous.textContent = ''
})

Equal.addEventListener('click', () => {
  if (presentNum != '' && pastNum != '') {
    Calculation()
  };
})

number.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleNumber(e.target.textContent)
  })
})

operator.forEach((key) => {
  key.addEventListener('click', (e) => {
    Operator(e.target.textContent)
  })
})
// ---

function Delete () {
  if (presentNum != '') {
    presentNum = presentNum.slice(0, -1)
    Current.textContent = presentNum
    if (presentNum == '') {
      Current.textContent = '0'
    }
  }
  if (presentNum == '' && pastNum !== '' && Operation == '') {
    pastNum = pastNum.slice(0, -1)
    Current.textContent = pastNum
  }
}

function KeyPress (e) {
  e.preventDefault()
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key)
  }
  if (e.key === 'Enter' || (e.key === '=' && presentNum != '' && pastNum != '')) {
    Calculation()
  }
  if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
    Operator(e.key)
  }
  if (e.key == '.') {
    addDecimal()
  }
  if (e.key == 'Backspace') {
    Delete()
  }
}

function addDecimal () {
  if (!presentNum.includes('.')) {
    presentNum += '.'
    Current.textContent = presentNum
  }
}

function Operator (op) {
  if (pastNum == '') {
    pastNum = presentNum
    OperatorCheck(op)
  } else if (presentNum == '') {
    OperatorCheck(op)
  } else {
    Calculation()
    Operation = op
    Current.textContent = '0'
    Previous.textContent = pastNum + ' ' + Operation
  }
}

function OperatorCheck (text) {
  Operation = text
  Previous.textContent = pastNum + ' ' + Operation
  Current.textContent = '0'
  presentNum = ''
}

function handleNumber (number) {
  if (pastNum != '' && presentNum != '' && Operation == '') {
    pastNum = ''
    Current.textContent = presentNum
  }

  if (presentNum.length <= 10) {
    presentNum += number
    Current.textContent = presentNum
  }
};

function roundNumber (num) {
  return Math.round(num * 100000) / 100000
}

function Calculation () {
  pastNum = Number(pastNum)
  presentNum = Number(presentNum)

  if (Operation == '+') {
    pastNum += presentNum
  } else if (Operation == '-') {
    pastNum -= presentNum
  } else if (Operation == '*') {
    pastNum *= presentNum
  } else if (Operation == '/') {
    if (presentNum <= 0) {
      pastNum = 'ERROR'
      Previous.textContent = ''
      Current.textContent = pastNum
      operator = ''
      return
    }
    pastNum /= presentNum
  }
  pastNum = roundNumber(pastNum)

  pastNum = pastNum.toString()

  Current.textContent = pastNum

  Previous.textContent = ''
  Operation = ''
  presentNum = ''
}
