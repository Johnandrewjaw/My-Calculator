let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
let Symbols = ["÷", "x", "-", "+", "%", "^", "=", "←", "C"];

let A = null; // First number
let B = null; // Second number
let operator = null; // Operator

function clearAll() {
  A = null;
  B = null;
  operator = null;
  display.value = "";
}

for(let button of buttons) {
  let value = button.textContent;

  button.addEventListener("click", function () {
    if (Symbols.includes(value)) {
      if (value === "=") {
        if (A !== null) {
          B = display.value;
          let numA = Number(A);
          let numB = Number(B);

          if (operator === "÷") {
            display.value = numA / numB;
          } else if (operator === "x") {
            display.value = numA * numB;
          } else if (operator === "-") {
            display.value = numA - numB;
          } else if (operator === "+") {
            display.value = numA + numB;
          } else if (operator === "%") {
            display.value = (numA * numB) / 100;
          } else if (operator === "^") {
            display.value = Math.pow(numA, numB);
          }
        }
        if (display.value !== "") {
          addToHistory(`${A} ${operator} ${B}`, display.value);
        }
      } else if (value === "←") {
        display.value = display.value.slice(0, -1);
      } else if (value === "%") {
        if (display.value !== "" && display.value !== "0") {
          display.value = Number(display.value) / 100;
          
        }
      } else {
        operator = value; // ÷ x - + % ^ =
        A = display.value;
        display.value = "";
      }
    } else if (value === ".") {
      if (display.value !== "" && !display.value.includes(value)) {
        display.value += value;
      }
    } else if (display.value === "0") {
      display.value = value;
    } else if (value === "C") {
      clearAll();
    } else {
      display.value += value;
    }
  });
}

// HISTORY FUNCTION
function addToHistory(expression, result) {
  let history = document.getElementById("historyContent");
  let entry = document.createElement("div");
  let button = document.createElement("button");
 
  entry.textContent = `${expression} = ${result}`;
  button.textContent = "delete";

  entry.addEventListener("click", function() {
    display.value = result;})
  button.addEventListener("click", function() {
    entry.remove(); });
    
  entry.appendChild(button);
  history.appendChild(entry);
  history.scrollTop = history.scrollHeight; // Scroll to the bottom
  if (history.children.length > 10) {
    history.removeChild(history.firstChild); // Remove the oldest entry if more than 10
  }
}

// KEYBOARD FUNCTIONALITY
document.addEventListener("keydown", function(event) {
  event.preventDefault();
  if (event.key >= "0" && event.key <= "9") {
    display.value += event.key;
  } else if (event.key === "Enter") {
    if (operator && A !== null) {
      B = display.value;
      let numA = Number(A);
      let numB = Number(B);

      if (operator === "÷") {
        display.value = numA / numB;
      } else if (operator === "x") {
        display.value = numA * numB;
      } else if (operator === "-") {
        display.value = numA - numB;
      } else if (operator === "+") {
        display.value = numA + numB;
      } else if (operator === "%") {
        display.value = (numA * numB) / 100;
      } else if (operator === "^") {
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
      else if (value === "%") {
        if (display.value !== "" && display.value !== "0") {
          display.value = Number(display.value) / 100;
        }
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