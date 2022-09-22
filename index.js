const keys = document.getElementsByClassName("keys")[0].children;
const del = document.getElementById("del");
const reset = document.getElementById("reset");
const equals = document.getElementById("equals");
const answer = document.getElementsByClassName("answer")[0];
let isVisible = false;

function handleDelete() {
  if (answer.textContent == "ERROR" || isVisible == true) {
    isVisible = false;
    answer.textContent = "0";
  }
  if (answer.textContent.length == 0) {
    answer.textContent = 0;
    return;
  }
  answer.textContent = answer.textContent.slice(0, -1);
  if (answer.textContent == "") answer.textContent = "0";
  return;
}

function handleClick(e) {
  if (answer.textContent == "ERROR" || isVisible == true) {
    if (
      (isVisible && e.target.textContent == "+") ||
      e.target.textContent == "/" ||
      e.target.textContent == "*" ||
      e.target.textContent == "-"
    ) {
      answer.textContent += e.target.textContent;
      answer.scrollLeft = answer.scrollWidth;
      isVisible = false;
      return;
    }
    isVisible = false;
    answer.textContent = "0";
  }
  if (answer.textContent == 0) answer.textContent = "";
  if (e.target.textContent == "DEL") {
    handleDelete();
    return;
  }
  answer.textContent += e.target.textContent;
  answer.scrollLeft = answer.scrollWidth;
}

function evaluate() {
  let string = answer.textContent;
  for (let i = 0; i < string.length; i++) {
    if (string[i] == "x") {
      string = string.slice(0, i) + "*" + string.slice(i + 1, string.length);
    }
  }
  try {
    string = eval(string);
    for (let i = 0; i < string.length; i++) {
      if (i % 3 == 0) {
        string = string.slice(0, i) + "," + string.slice(i, string.length);
      }
    }
    string = Math.round(Number(string) * 100) / 100;
    isVisible = true;
    answer.textContent = string;
    answer.scrollLeft = 0;
  } catch (error) {
    answer.textContent = "ERROR";
  }
  return;
}

function handleKeyDown(e) {
  if (e.key === "Backspace") {
    handleDelete();
    console.log(e);
    return;
  }
  if (e.key == "Enter") {
    evaluate();
    return;
  }
  let string = e.key.match(/[0-9]/);
  if (string == null) string = e.key.match(/[+*\/-]/);
  if (string == null) return;

  if (answer.textContent == "ERROR" || isVisible == true) {
    if (
      isVisible &&
      (e.key == "+" || e.key == "/" || e.key == "*" || e.key == "-")
    ) {
      answer.textContent += e.key;
      answer.scrollLeft = answer.scrollWidth;
      isVisible = false;
      return;
    }
    isVisible = false;
    answer.textContent = "0";
  }
  if (answer.textContent == 0) answer.textContent = "";
  answer.textContent += e.key;
  answer.scrollLeft = answer.scrollWidth;
}

document.addEventListener("keydown", handleKeyDown);

for (let key of keys) {
  key.addEventListener("click", handleClick);
}

reset.addEventListener("click", (e) => {
  answer.textContent = "0";
});

equals.addEventListener("click", evaluate);
