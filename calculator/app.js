const $ = document;
const buttonsContainer = $.querySelector(".buttons");
const expressionElem = $.querySelector(".expression");
const resultElem = $.querySelector(".result");

let expression = "";
let result = "";

const clickHandler = (event) => {
  const target = event.target;
  const action = target.dataset.action;
  const value = target.dataset.value;

  switch (action) {
    case "number":
      updateResult(value);
      break;

    case "division":
    case "multiplication":
    case "subtraction":
    case "addition":
      if (!isLastCharacterOperator(result)) {
        updateResult(value);
      }
      break;
    case "submit":
      calculate(result);
      break;
  }
};

const updateResult = (value) => {
  result += value;
  resultElem.textContent = result;
};

const isLastCharacterOperator = (value) => {
  return isNaN(parseInt(value.slice(-1)));
};

const calculate = (operation) => {
  const arr = operation.split(/([+\-*/])/);

  for (let i = 1; i < arr.length; i += 2) {
    if (arr[i] === "*") {
      result = Number(arr[i - 1]) * Number(arr[i + 1]);
      arr.splice(i - 1, 3, result);
      i -= 2;
    }
  }

    for (let i = 1; i < arr.length; i += 2) {
    if (arr[i] === "/") {
      result = Number(arr[i - 1]) / Number(arr[i + 1]);
      arr.splice(i - 1, 3, result);
      i -= 2;
    }
  }

    for (let i = 1; i < arr.length; i += 2) {
    if (arr[i] === "+") {
      result = Number(arr[i - 1]) + Number(arr[i + 1]);
      arr.splice(i - 1, 3, result);
      i -= 2;
    }
  }

    for (let i = 1; i < arr.length; i += 2) {
    if (arr[i] === "-") {
      result = Number(arr[i - 1]) - Number(arr[i + 1]);
      arr.splice(i - 1, 3, result);
      i -= 2;
    }
  }

  expressionElem.textContent = operation;
  resultElem.textContent = arr[0];
  result = arr[0].toString();
};

buttonsContainer.addEventListener("click", clickHandler);
