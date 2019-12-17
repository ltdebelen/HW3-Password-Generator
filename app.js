// DOM Elements
const btnGeneratePW = document.getElementById("generate");
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
});

function generatePassword(length, symbol, number, lowercase, uppercase) {
  let parsedLength = parseInt(length);

  console.log(parsedLength, symbol, number, lowercase, uppercase);
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
    return "";
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
