// DOM Elements
const btnGeneratePW = document.getElementById("generate");
const btnCopyPW = document.getElementById("copy");
const passwordEl = document.getElementById("password");

btnGeneratePW.addEventListener("click", () => {
  let passwordLength = prompt(
    "Please enter password length (Minimum: 8) (Maximum: 128) characters"
  );

  if (passwordLength == "" || passwordLength < 8 || passwordLength > 128) {
    alert(
      "Please enter a valid value! Example: Numbers ranging from (8 - 128)"
    );
  } else {
    let hasSymbol = confirm("Add symbols to password?");
    let hasNumber = confirm("Add numeric characters to password?");
    let hasLowerCase = confirm("Add lowercase characters to password?");
    let hasUpperCase = confirm("Add uppercase characters to password?");

    passwordEl.value = generatePassword(
      passwordLength,
      hasSymbol,
      hasNumber,
      hasLowerCase,
      hasUpperCase
    );
  }
});

function generatePassword(length, symbol, number, lowercase, uppercase) {
  let parsedLength = parseInt(length);
  let generatedPassword = "";
  const typesCount = lowercase + uppercase + number + symbol;

  // This ensures that the user selects at least 1 password character type
  if (typesCount === 0) {
    alert(
      "NO PASSWORD GENERATED: Please select atleast one password character type"
    );
    return "";
  } else {
    // Need to push FALSE conditions into an Array
    let passwordCondition = [symbol, number, lowercase, uppercase];
    let falseConditions = [];
    let element = false;
    let idx = passwordCondition.indexOf(element);
    while (idx != -1) {
      falseConditions.push(idx);
      idx = passwordCondition.indexOf(element, idx + 1);
    }

    // Loop through FALSE conditions and remove it from the Function Array
    for (var i = falseConditions.length - 1; i >= 0; i--) {
      myFunctions.splice(falseConditions[i], 1);
    }

    // Loop through the length of the required password
    for (var i = 0; i < parsedLength; i++) {
      let randomFunctionIndex = Math.floor(Math.random() * myFunctions.length);

      // need to build string from calling the functions randomly
      generatedPassword =
        generatedPassword + myFunctions[randomFunctionIndex]();
    }
    return generatedPassword;
  }
}

// Copy password to clipboard
btnCopyPW.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = passwordEl.value;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});

// Functions
const myFunctions = [
  function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  },

  function getRandomNumber() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return numbers[Math.floor(Math.random() * numbers.length)];
  },

  function getRandomLower() {
    const alphabetsLower = "abcdefghijklmnopqrstuvwxyz";
    return alphabetsLower[Math.floor(Math.random() * alphabetsLower.length)];
  },

  function getRandomUpper() {
    const alphabetsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabetsUpper[Math.floor(Math.random() * alphabetsUpper.length)];
  }
];
