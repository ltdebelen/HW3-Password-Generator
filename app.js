// DOM Elements
const btnGeneratePW = document.getElementById("generate");
const btnCopyPW = document.getElementById("copy");
const passwordEl = document.getElementById("password");

const randomFunc = {
  number: getRandomNumber,
  symbol: getRandomSymbol,
  uppercase: getRandomLower,
  lowercase: getRandomUpper
};

// Event Listener for Generate password button
btnGeneratePW.addEventListener("click", () => {
  let passwordLength = prompt(
    "Please enter password length (Minimum: 8) (Maximum: 128) characters"
  );

  if (passwordLength == "") {
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

// Generate password function
function generatePassword(length, symbol, number, lowercase, uppercase) {
  let parsedLength = parseInt(length);
  let generatedPassword = "";
  const typesCount = lowercase + uppercase + number + symbol;

  const typesArr = [
    { lowercase },
    { uppercase },
    { number },
    { symbol }
  ].filter(item => Object.values(item)[0]);

  // Doesn't have a selected type
  if (typesCount === 0) {
    alert("NO PASSWORD GENERATED: Please select a password character type");
  }

  // create a loop
  for (let i = 0; i < parsedLength; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
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
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function getRandomNumber() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomLower() {
  const alphabetsLower = "abcdefghijklmnopqrstuvwxyz";
  return alphabetsLower[Math.floor(Math.random() * alphabetsLower.length)];
}

function getRandomUpper() {
  const alphabetsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabetsUpper[Math.floor(Math.random() * alphabetsUpper.length)];
}
