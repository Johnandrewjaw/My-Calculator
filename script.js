const buttonValues = [
    "1", "2", "3", "x", "÷",
    "4", "5", "6", "+", "-",
    "7", "8", "9", "%", "^",
    ".", "0", "C", "←", "="
];
let Symbols = ["x", "÷", "+", "-", "%", "^", "=", "←"];

let display = document.getElementById("display");
let historyContent = document.getElementById("historyContent");

// INITIALIZE VARIABLES
let A = 0;
let operator = null;
let B = null;

function clearAll() {
  A = null;
  operator = null;
  B = null;
}

// CREATE BUTTONS DYNAMICALLY
for (let i = 0; i < buttonValues.length; i++) {
  let value = buttonValues[i];
  let button = document.createElement("button");
  button.innerText = value;

  //styling button colors
  if (value == "=") {
    button.style.backgroundColor = "grey";
    button.style.color = "black";
    button.style.width = "45px";
    button.style.marginLeft = "8px";
    button.style.boxShadow = "none";
    button.style.borderRadius = "50px";
  } else if (Symbols.includes(value)) {
    button.style.backgroundColor = "#FF9500";
    button.style.boxShadow = "none";
    button.style.width = "45px";
    button.style.borderRadius = "50px";
    button.style.marginLeft = "8px";
  }

  //process button clicks
  button.addEventListener("click", function () {
    if (Symbols.includes(value)) {
      if (value == "=") {
        if (A != null) {
          B = display.value;
          let numA = Number(A);
          let numB = Number(B);

          if (operator == "÷") {
            display.value = numA / numB;
          } else if (operator == "x") {
            display.value = numA * numB;
          } else if (operator == "-") {
            display.value = numA - numB;
          } else if (operator == "+") {
            display.value = numA + numB;
          } else if (operator == "%") {
            display.value = (numA * numB) / 100;
          } else if (operator == "^") {
            display.value = Math.pow(numA, numB);
          }
        }
        if (display.value != "") {
          addToHistory(`${A} ${operator} ${B}`, display.value);
        }
      } else if (value == "←") {
        display.value = display.value.slice(0, -1);
        }
        else if (value == "%") {
        if (display.value != "" && display.value != "0") {
           display.value = Number(display.value) / 10;
        }
        }  
        else {
        operator = value; //÷ × - + % ^ = ←
        A = display.value;
        display.value = "";
        }
    } 
    //don't add multiple decimal places  
    else if (value == ".") {
        if (display.value != "" && !display.value.includes(value)) {
        display.value += value;
        }
    }
    //not a dot, number instead
    else if (display.value == "0") {
      display.value = value;
      } else if (value == "C") {
      clearAll();
      display.value = "";
      } else {
      display.value += value;
    }
  });
  // Append the button to the calculator
  document.getElementById("buttons").appendChild(button);
}


//HISTORY FUNCTIONALITY
function addToHistory(expression, result) {
  let divItem = document.createElement("div");
  let span = document.createElement("span");
  let button = document.createElement("button");

  divItem.className = "historyItems";
  divItem.style.textAlign = "start";

  span.textContent = `${expression} = ${result}`;
  span.dataset.userInput = expression;
  span.style.cursor = "pointer";
  span.style.color = "white";

  button.textContent = "Delete";
  button.className = "btn-sm";

  button.addEventListener("click", () => divItem.remove());
  span.addEventListener("click", () => {
    input.value = span.dataset.userInput;
  });
  divItem.appendChild(span);
  divItem.appendChild(button);
  historyContent.appendChild(divItem);
}


// KEYBOARD FUNCTIONALITY
document.addEventListener("keydown", function (event) {
  event.preventDefault();
  if (event.key >= "0" && event.key <= "9") {
    display.value += event.key;
  } else if (event.key === "Enter") {
    if (operator && A !== null) {
      B = display.value;
      let numA = Number(A);
      let numB = Number(B);

      if (operator == "÷") {
        display.value = numA / numB;
      } else if (operator == "x") {
        display.value = numA * numB;
      } else if (operator == "-") {
        display.value = numA - numB;
      } else if (operator == "+") {
        display.value = numA + numB;
      } else if (operator == "%") {
        display.value = (numA * numB) / 100;
      } else if (operator == "^") {
        display.value = Math.pow(numA, numB);
      }
      addToHistory(`${A} ${operator} ${B}`, display.value);
      clearAll();
    }
  } else if (event.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (event.key === "Delete") {
    clearAll();
    display.value = "";
  } else if (Symbols.includes(event.key)) {
    if (event.key === "=") {
      if (A != null) {
        B = display.value;
        let numA = Number(A);
        let numB = Number(B);

        if (operator == "÷") {
          display.value = numA / numB;
        } else if (operator == "x") {
          display.value = numA * numB;
        } else if (operator == "-") {
          display.value = numA - numB;
        } else if (operator == "+") {
          display.value = numA + numB;
        } else if (operator == "%") {
          display.value = (numA * numB) / 100;
        } else if (operator == "^") {
          display.value = Math.pow(numA, numB);
        }
      }
      if (display.value != "") {
        addToHistory(`${A} ${operator} ${B}`, display.value);
      }
    } else if (event.key === "C") {
      clearAll();
      display.value = "";
    } else {
      operator = event.key; //÷ × - + % ^
      A = display.value;
      display.value = "";
    }
  }
});