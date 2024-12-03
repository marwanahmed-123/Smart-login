// global variables
let accounts = [
  { username: "testUser", email: "test@example.com", password: "Test123!" },
];
let formType = "login";
let pageType = "registration";
var currentAccount;
// general functions
function isExistingAccount(account) {
  for (let index = 0; index < accounts.length; index++) {
    const element = accounts[index];
    if (
      element.email == account.email ||
      element.username == account.username ||
      element.password == account.password
    ) {
      return true;
    }
  }
  return false;
}
// signin functions
function loginValid(mail, pass) {
  let mailElem = document.getElementById("login-email");
  let passElem = document.getElementById("login-pass");
  for (let index = 0; index < accounts.length; index++) {
    if (
      accounts[index].email == mailElem.value &&
      accounts[index].password == passElem.value
    ) {
      return index;
    }
  }
  return -1;
}
function login() {
  let mailElem = document.getElementById("login-email");
  let passElem = document.getElementById("login-pass");
  var emptyField = document.getElementById("missing-inputs");
  var incorrect = document.getElementById("incorrect-input");
  let index = loginValid(mailElem.value, passElem.value);
  let flag = false;
  emptyField.classList.add("d-none");
  incorrect.classList.add("d-none");
  if (index != -1) {
    currentAccount = accounts[index];
    flag = true;
  } else if (mailElem.value == "" || passElem.value == "") {
    incorrect.classList.add("d-none");
    emptyField.classList.remove("d-none");
  } else {
    emptyField.classList.add("d-none");
    incorrect.classList.remove("d-none");
    incorrect.textContent = "incorrect email or password";
  }
  passElem.value = "";
  mailElem.value = "";
  return flag;
}
// signup functions
function validateSignUp(metaData, data) {
  let regex = {
    email:
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
    pass: /^[a-z0-9_-]{3,15}$/,
    username: /^[a-z0-9_-]{3,15}$/,
  };
  if (metaData == "email") {
    if (!regex.email.test(data)) {
      return false;
    } else {
      return true;
    }
  } else if (metaData == "pass") {
    if (!regex.pass.test(data)) {
      return false;
    } else {
      return true;
    }
  } else if (metaData == "username") {
    if (!regex.username.test(data)) {
      return false;
    } else {
      return true;
    }
  }
  return false;
}
function validateUserName(userName) {
  if (validateSignUp("username", userName)) {
    return true;
  } else {
    return false;
  }
}
function validateEmail(email) {
  if (validateSignUp("email", email)) {
    return true;
  } else {
    return false;
  }
}
function validatePassword(pass) {
  if (validateSignUp("pass", pass)) {
    return true;
  } else {
    return false;
  }
}
function validateSignup() {
  let username = document.getElementById("signup-username").value;
  let pass = document.getElementById("signup-pass").value;
  let email = document.getElementById("signup-email").value;
  let missing = document.getElementById("signup-missing-inputs");
  let incorrect = document.getElementById("signup-incorrect-input");
  if (
    validateEmail(email) &&
    validatePassword(pass) &&
    validateUserName(username)
  ) {
    missing.classList.add("d-none");
    incorrect.classList.add("d-none");
    return true;
  } else if (username == "" || pass == "" || email == "") {
    incorrect.classList.add("d-none");
    missing.classList.remove("d-none");
    return false;
  } else {
    incorrect.textContent = "incorrect";
    if (!validateEmail(email)) {
      incorrect.textContent += " email";
    }
    if (!validateUserName(username)) {
      incorrect.textContent += " username";
    }
    if (!validatePassword(pass)) {
      incorrect.textContent += " password";
    }
    missing.classList.add("d-none");
    incorrect.classList.remove("d-none");
    return false;
  }
}
function signUp() {
  let usernameElem = document.getElementById("signup-username");
  let mailElem = document.getElementById("signup-email");
  let passElem = document.getElementById("signup-pass");
  let flag = false;
  if (validateSignup()) {
    const account = {
      username: usernameElem.value,
      email: mailElem.value,
      password: passElem.value,
    };
    let existing = document.getElementById("existing-account");
    if (isExistingAccount(account)) {
      existing.classList.remove("d-none");
    } else {
      existing.classList.add("d-none");
      accounts.push(account);
      flag = true;
    }
  }
  usernameElem.value = "";
  passElem.value = "";
  mailElem.value = "";
  return flag;
}
document.getElementById("login").addEventListener("click", function (event) {
  event.preventDefault();
  if (login()) {
    console.log(currentAccount);
    switchPage();
    let username = currentAccount.username;
    let welcomeMsg = document.getElementById("welcome-msg");
    welcomeMsg.textContent += " " + username;
  }
});
document.getElementById("signup").addEventListener("click", function (event) {
  event.preventDefault();
  if (signUp()) {
    switchFormType();
  }
});
// Form Switch (sign in or signup)
function switchFormType() {
  let regForm = document.getElementById("register-form");
  let loginForm = document.getElementById("login-form");
  if (formType == "login") {
    regForm.classList.remove("d-none");
    loginForm.classList.add("d-none");
    formType = "signup";
  } else {
    regForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
    formType = "login";
  }
}
function switchPage() {
  let regPage = document.getElementById("registration");
  let homePage = document.getElementById("home");
  if (pageType == "registration") {
    regPage.classList.add("d-none");
    homePage.classList.remove("d-none");
    pageType = "home";
  } else {
    homePage.classList.add("d-none");
    regPage.classList.remove("d-none");
    pageType = "registration";
  }
}
document
  .getElementById("switch-form")
  .addEventListener("click", function (event) {
    if (event.target.id === "switch-form") {
      event.preventDefault();
      switchFormType();
    }
  });
// logout
document.getElementById("logout").addEventListener("click", function (event) {
  switchPage();
  currentAccount = null;
});
