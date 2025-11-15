// ! ======> HTML Elements 
// * signUp
var signUpNameInput = document.querySelector('.signUpNameInput');
var signUpEmailInput = document.querySelector('.signUpEmailInput');
var signUpPasswordInput = document.querySelector('.signUpPasswordInput');
var signUpBtn = document.querySelector('.signUpBtn');
var confirmMsg = document.querySelector('.confirmMsg');
// * signIn
var signInInputEmail = document.querySelector('.signInInputEmail');
var signInInputPassword = document.querySelector('.signInInputPassword');
var signInBtn = document.querySelector('.signInBtn');
// * hello
var welcomeName = document.querySelector('.welcomeName');
var logOutBtn = document.querySelector('.logOutBtn');


// ! ======> App variables
var usersList ;
var usernameRegex = /^[A-Za-z]{3,10}( [A-Za-z]{3,10})?$/;
var passwordRegex = /^.{5,15}$/;
var emailRegex = /^[A-Za-z0-9._%+-]{5,15}@[A-Za-z0-9.-]{5,15}\.com$/;
var welcomedUser = localStorage.getItem('currentUser');


if(localStorage.getItem('usersList') == null) {
    usersList = [];
}
else {
    usersList = JSON.parse(localStorage.getItem('usersList'));
}

// ! ======> Functions
// ? signUp
function signUp() { 
    var isValid = validate(signUpNameInput, usernameRegex) && 
    validate(signUpPasswordInput, passwordRegex) && 
    validate(signUpEmailInput, emailRegex);
    console.log("Validation result:", isValid);
    console.log("isExist result:", isExist());
    if (isValid && isExist() == false) {
        var user = {
            name: signUpNameInput.value,
            email: signUpEmailInput.value,
            password: signUpPasswordInput.value
        };
        usersList.push(user);
        localStorage.setItem('usersList', JSON.stringify(usersList));
        Swal.fire({
            icon: "success",
            title: "Account created successfully!",
        });
    } else if (isExist()) {
        console.log("Email already exists");
        Swal.fire({
            icon: "error",
            title: "Email already exist! Try another email address.",
          });
    } else {
        console.log("Validation failed");
        Swal.fire({
            icon: "error",
            title: "Validation error! Please check your input fields!",
        });
    }   
    clearInputs();
}

// ? validate
function validate(input, regex) {
    if(regex.test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    }
    else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}

// ? isExist
function isExist() {
    for(let i=0; i<usersList.length; i++) {
        if(usersList[i].email.toLowerCase() == signUpEmailInput.value.toLowerCase()) {
            signUpEmailInput.classList.remove('is-valid');
            signUpEmailInput.classList.add('is-invalid');
            return true;
        }
    }
    return false;
}

// ? logIn
function login() {
    if(signInInputEmail.value=="" || signInInputPassword.value=="") {
        Swal.fire({
            icon: "error",
            title: "Please fill your data!",
          });
          return false;
    }
    for(var i=0; i<usersList.length; i++) {
        if(usersList[i].email.toLowerCase() == signInInputEmail.value.toLowerCase() &&
        usersList[i].password == signInInputPassword.value) {
            console.log("ya welcome ya welcome");
            localStorage.setItem('currentUser', usersList[i].name);
            signInBtn.setAttribute('href', 'home.html');
            window.location.href = 'home.html';
            return true;
        }
    }
    console.log('Please check your data');
    Swal.fire({
        icon: "error",
        title: "Please check your data!", 
    });
    return false;
            
}

// ? welcome
function welcome() {
    welcomeName.innerHTML = "Welcome, " + welcomedUser;
}

// ? logOut
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ? clearInputs 
function clearInputs() {
    signUpEmailInput.value = "";
    signUpNameInput.value = "";
    signUpPasswordInput.value = "";
    signUpEmailInput.classList.remove('is-valid');
    signUpNameInput.classList.remove('is-valid');
    signUpPasswordInput.classList.remove('is-valid');
}