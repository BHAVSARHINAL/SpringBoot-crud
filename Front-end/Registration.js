// FirstName Validation
var firstName = document.getElementById("firstName");
var firstNameValidation = function () {
    firstNameValue = firstName.value.trim();
    firstNameRegex = /^[A-Za-z]+$/;
    firstNameError = document.getElementById('first-name-error');
    if (firstNameValue == "") {
        firstNameError.innerHTML = "FirstName is require!!";
        return false;
    } else if (!firstNameRegex.test(firstNameValue)) {
        firstNameError.innerHTML = "FirstName contains only characters!";
        return false;
    } else {
        firstNameError.innerHTML = "";
        return true;
    }
}
firstName.oninput = function () {
    firstNameValidation();
    checkFormCompletion();
}
// LastName validation
var lastName = document.getElementById("lastName");
var lastNameValidation = function () {
    lastNameValue = lastName.value.trim();
    lastNameRegex = /^[A-Za-z]+$/;
    lastNameError = document.getElementById('last-name-error');
    if (lastNameValue == "") {
        lastNameError.innerHTML = "LastName is require!!";
        return false;
    } else if (!lastNameRegex.test(lastNameValue)) {
        lastNameError.innerHTML = "LastName contains only characters!";
        return false;
    } else {
        lastNameError.innerHTML = "";
        return true;
    }
}
lastName.oninput = function () {
    lastNameValidation();
    checkFormCompletion();
}
// Mobile Validation
var mobile = document.getElementById("mobile");
var mobileValidation = async function () {
    mobileValue = mobile.value.trim();
    mobileRegex = /^([+]\d{2})?\d{10}$/;
    mobileError = document.getElementById("mobile-error");
    if (mobileValue == "") {
        mobileError.innerHTML = "MobileNumber is require!!";
        return false;
    } else if (!mobileRegex.test(mobileValue)) {
        mobileError.innerHTML = "Enter only 10 digits,characters are not allowed";
        return false;
    } else if (mobileValue.length != 10) {
        mobileError.innerHTML = "Enter only 10 digits in mobile number";
        return false;
    } else if (await checkExistence('mobile', mobileValue)) {
        mobileError.innerHTML = "Mobile number already exists!";
        return false;
    } else {
        mobileError.innerHTML = "";
        return true;
    }
}
mobile.oninput = async function () {
    await mobileValidation();
    checkFormCompletion();
}
// Email Validation
var email = document.getElementById("email");
var emailValidation = async function () {
    emailValue = email.value.trim();
    emailRegex = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/;
    emailError = document.getElementById('email-error');
    if (emailValue == "") {
        emailError.innerHTML = "Email is require!!";
        return false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.innerHTML = "Please input email with @ symbol";
        return false;
    } else if (await checkExistence('email', emailValue)) {
        emailError.innerHTML = "Email already exists!";
        return false;
    } else {
        emailError.innerHTML = "";
        return true;
    }
}
email.oninput = async function () {
    await emailValidation();
    checkFormCompletion();
}
//Calculation of age base on customer's birthdate
function calculateAge() {
    const dob = document.getElementById('dateOfBirth').value;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById('age').value = age;
    checkFormCompletion();
}
// Age Validation
var age = document.getElementById("age");
var ageValidation = function () {
    var ageValue = age.value.trim();
    var ageError = document.getElementById("age-error");
    if (parseInt(ageValue) == "" && parseInt(ageValue) === 0) {
        ageError.innerHTML = "Age is require and age can't be 0!!";
        return false;
    }
    else {
        ageError.innerHTML = "";
        return true;
    }
}
// Future date disable functionality
const dateInput = document.getElementById('dateOfBirth');
const today = new Date();
const oneYearFromToday = new Date();
oneYearFromToday.setFullYear(today.getFullYear() + 1);
dateInput.max = formatDate(today);
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
// Birth-Date Validation and Age Calculation
var dateOfBirth = document.getElementById("dateOfBirth");
var dateOfBirthValidation = function () {
    var dateOfBirthValue = dateOfBirth.value;
    var dateOfBirthError = document.getElementById("dateOfBirth-error");
    var today = new Date();
    var birthDate = new Date(dateOfBirthValue);

    if (dateOfBirth.value == "") {
        age.value = "";
        return false;
    }
    else {
        dateOfBirthError.innerHTML = "";
        return true;
    }
}
dateOfBirth.oninput = function () {
    DateOfBirthValidation();
    checkFormCompletion();
    ageValidation();
}
// Address1 Validation
var address1 = document.getElementById("address1");
var address1Validation = function () {
    address1Value = address1.value.trim();
    address1Error = document.getElementById('address1-error');
    if (address1Value == "") {
        address1Error.innerHTML = "Address1 is require!!";
        return false;
    } else {
        address1Error.innerHTML = "";
        return true;
    }
}
address1.oninput = function () {
    address1Validation();
    checkFormCompletion();
}
// Address2 Validation
var address2 = document.getElementById("address2");
var address2Validation = function () {
    address2Value = address2.value.trim();
    address2Error = document.getElementById('address2-error');
    if (address2Value == "") {
        address2Error.innerHTML = "Address2 is require!!";
        return false;
    } else {
        address2Error.innerHTML = "";
        return true;
    }
}
address2.oninput = function () {
    address2Validation();
    checkFormCompletion();
}
// Gender validation
var gender = document.getElementsByName("gender");
function genderValidation() {
    genderError = document.getElementById('gender-error');
    var male = document.getElementById('male');
    var female = document.getElementById('female');
    var other = document.getElementById('other');
    if (!(male.checked) && !(female.checked) && !(other.checked)) {
        genderError.innerHTML = "Gender is required";
        return false;
    } else {
        genderError.innerHTML = "";
        return true;
    }
}
gender.forEach(g => g.onchange = function () {
    genderValidation();
    checkFormCompletion();
});
//Check exists email and mobile number 
const button = document.querySelector(".submit-button")
async function checkExistence(type, value) {
    const response = await fetch(`http://localhost:8080/api/v1/checkExistence?type=${type}&value=${value}`);
    const data = await response.json();
    return data.exists;
}
// If all fields are completed then submit button enable
firstNameRegex = /^[A-Za-z]+$/;
lastNameRegex = /^[A-Za-z]+$/;
mobileRegex = /^([+]\d{2})?\d{10}$/;
emailRegex = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/;
async function checkFormCompletion() {
    const mobileExists = await checkExistence('mobile', mobile.value.trim());
    const emailExists = await checkExistence('email', email.value.trim());
    const isFormComplate =
        dateOfBirthValidation() &&
        ageValidation() &&
        age.value !== "" &&
        firstNameRegex.test(firstName.value) &&
        lastNameRegex.test(lastName.value) &&
        await mobileRegex.test(mobile.value) && mobile.value !== "" && mobile.length != 10 &&
        await emailRegex.test(email.value) &&
        address1.value !== "" &&
        address2.value !== "" &&
        genderValidation()
    const submitButton = document.getElementById('submitButton');
    if (isFormComplate && !mobileExists && !emailExists) {
        submitButton.style.display = 'block';
    } else {
        submitButton.style.display = 'none';
    }
}
//Save records
button.addEventListener('input', checkFormCompletion());
function saveCustomer() {
    return {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        mobile: document.getElementById('mobile').value,
        address1: document.getElementById('address1').value,
        address2: document.getElementById('address2').value,
        age: document.getElementById('age').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        email: document.getElementById('email').value
    }
}
function addCustomer() {
    let payload = saveCustomer();
    fetch('http://localhost:8080/api/v1/createcustomer', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.ok) {
            alert("Customer successfully registered!!");
            window.location.href = 'ViewFile.html';

        }
    })
}