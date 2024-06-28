// FirstName Validation
var firstName = document.getElementById("firstName");
var firstNameValidation = function () {
    firstNameValue = firstName.value.trim();
    firstNameRegex = /^[A-Za-z]+$/;
    firstNameError = document.getElementById('first-name-error');
    if (firstNameValue == "") {
        firstNameError.innerHTML = "FirstName is required!!";
    } else if (!firstNameRegex.test(firstNameValue)) {
        firstNameError.innerHTML = "FirstName contains only characters!";
    } else {
        firstNameError.innerHTML = "";
        return true;
    }
}
firstName.oninput = function () {
    firstNameValidation();
    checkFormCompletion();
}
// LastName Validation
var lastName = document.getElementById("lastName");
var lastNameValidation = function () {
    lastNameValue = lastName.value.trim();
    lastNameRegex = /^[A-Za-z]+$/;
    lastNameError = document.getElementById('last-name-error');
    if (lastNameValue == "") {
        lastNameError.innerHTML = "LastName is required!!";
    } else if (!lastNameRegex.test(lastNameValue)) {
        lastNameError.innerHTML = "LastName contains only characters!";
    } else {
        lastNameError.innerHTML = "";
        return true;
    }
}
lastName.oninput = function () {
    lastNameValidation();
    checkFormCompletion();
}
// Email Validation
async function checkEmailExistence() {
    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();
    const emailRegex = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/;
    const emailError = document.getElementById('email-error');
    if (emailValue === "") {
        emailError.innerHTML = "Email is required!";
        return false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.innerHTML = "Please input a valid email address";
        return false;
    }
    const currentCustomerId = document.getElementById('customerid').value;
    const response = await fetch(`http://localhost:8080/api/v1/customers/exists/email?email=${emailValue}&excludeId=${currentCustomerId}`);
    const exists = await response.json();
    if (exists) {
        emailError.innerHTML = "Email already exists!";
        return false;
    } else {
        emailError.innerHTML = "";
        return true;
    }
}
//Mobile validation
async function checkMobileExistence() {
    const mobileInput = document.getElementById("mobile");
    const mobileValue = mobileInput.value.trim();
    const mobileRegex = /^[0-9]{10}$/;
    const mobileError = document.getElementById('mobile-error');
    if (mobileValue === "") {
        mobileError.innerHTML = "Mobile number is required!";
        return false;
    } else if (!mobileRegex.test(mobileValue)) {
        mobileError.innerHTML = "Please input a valid mobile number";
        return false;
    }
    const currentCustomerId = document.getElementById('customerid').value;
    const response = await fetch(`http://localhost:8080/api/v1/customers/exists/mobile?mobile=${mobileValue}&excludeId=${currentCustomerId}`);
    const exists = await response.json();
    if (exists) {
        mobileError.innerHTML = "Mobile number already exists!";
        return false;
    } else {
        mobileError.innerHTML = "";
        return true;
    }
}
// Age Validation
var age = document.getElementById("age");
var ageValidation = function () {
    var ageValue = age.value.trim();
    var ageError = document.getElementById("age-error");
    if (parseInt(ageValue) === 0) {
        ageError.innerHTML = "Age cannot be 0!!";
        return false;
    } else {
        ageError.innerHTML = "";
        return true;
    }
}
// Birth-Date Validation and Age Calculation
var dateOfBirth = document.getElementById("dateOfBirth");
var dateOfBirthValidation = function () {
    var dateOfBirthValue = dateOfBirth.value;
    var dateOfBirthError = document.getElementById("dateOfBirth-error");
    var today = new Date();
    var birthDate = new Date(dateOfBirthValue);
    if (dateOfBirthValue == "") {
        dateOfBirthError.innerHTML = "Date of Birth is require";
        age.value = "";
        return false;
    } else if (birthDate.getFullYear() === 0) {
        dateOfBirthError.innerHTML = "Invalid date!!";
        age.value = "";
        return false;
    } else {
        dateOfBirthError.innerHTML = "";
        return true;
    }
}
dateOfBirth.oninput = function () {
    dateOfBirthValidation();
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
    } else {
        address2Error.innerHTML = "";
        return true;
    }
}
address2.oninput = function () {
    address2Validation();
    checkFormCompletion();
}
//Gender Validation
var gender = document.getElementsByName("gender");
function genderValidation() {
    genderError = document.getElementById('gender-error');
    var Male = document.getElementById('Male');
    var Female = document.getElementById('Female');
    var Other = document.getElementById('Other');
    if (!(Male.checked) && !(Female.checked) && !(Other.checked)) {
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
const button = document.querySelector(".submit-button")
//Change date format
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
// reset form after click update button
function resetErrorMessages() {
    document.querySelectorAll('.error-message').forEach(errorElement => {
        errorElement.innerHTML = '';
    });
}
// Future date not allow functionality
document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById('dateOfBirth');
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    dateInput.max = formattedToday;

    loadCustomers();
});
// View customer's data in the table
function loadCustomers() {
    fetch("http://localhost:8080/api/v1/getcustomerlist")
        .then((response) => response.json())
        .then((customers) => {
            const customerTableBody = document.getElementById(
                "customer-table-body"
            );
            customerTableBody.innerHTML = "";
            customers.forEach((customer) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${customer.firstName} ${customer.lastName}</td>
                    <td>${formatDate(customer.dateOfBirth)}</td>
                    <td>${customer.mobile} </td>
                    <td>${customer.address1} ${customer.address2}</td>
                    <td>${customer.gender} </td>
                    <td class="action-buttons">
                        <button style="background-color: rgb(72, 72, 224);height: 35px;width: 60px;border-radius: 4px;
                           color: white;"onclick="editCustomer(${customer.id});" >Edit</button>
                       <button style="background-color: rgb(240, 6, 6);height: 35px;width: 60px;border-radius: 4px;
                           color: rgb(235, 230, 230);" onclick="deleteCustomer(${customer.id})">Delete</button>
                    </td>`;
                customerTableBody.appendChild(row);
            });
        });
}
function showAddCustomerForm() {
    document.getElementById("cusomerid").value = "";
    document.getElementById("customer-form").reset();
    document.getElementById("customer-form-modal").style.display = "block";
}
function closeCustomerForm() {
    document.getElementById('customer-form-modal').style.display = 'none';
}
document.addEventListener("DOMContentLoaded", () => {
    loadCustomers();
});
// if all fields are completed with validations then submit button enable unless it's disable 
firstNameRegex = /^[A-Za-z]+$/;
lastNameRegex = /^[A-Za-z]+$/;
mobileRegex = /^([+]\d{2})?\d{10}$/;
emailRegex = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/;
async function checkFormCompletion() {
    const isFormComplate =
        firstNameRegex.test(firstName.value) &&
        lastNameRegex.test(lastName.value) &&
        dateOfBirth.value !== "" &&
        dateOfBirthValidation() &&
        ageValidation() &&
        await checkMobileExistence() && mobile.value !== "" &&
        await checkEmailExistence() && email.value !== "" &&
        address1.value !== "" &&
        address2.value !== ""
    const submitButton = document.getElementById('submitButton');
    if (isFormComplate) {
        submitButton.style.display = 'block';
    } else {
        submitButton.style.display = 'none';
    }
}
//show customer's age based on birth-date
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
//Save updated record
button.addEventListener('input', checkFormCompletion());
function saveCustomer() {
    const customerId = document.getElementById('customerid').value;
    const customerData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        address1: document.getElementById('address1').value,
        address2: document.getElementById('address2').value,
        age: document.getElementById('age').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
    };
    if (customerId) {
        fetch(`${'http://localhost:8080/api/v1/updatecustomer'}/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        }).then(response => {
            if (response.ok) {
                alert("Customer Update Sucessfully!!");
                window.location.href = 'ViewFile.html';

                loadCustomers();
                closeCustomerForm();

            }
        });
    } else {
        fetch('http://localhost:8080/api/v1/createcustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        }).then(response => {
            if (response.ok) {
                loadCustomers();
                closeCustomerForm();
            }
        });
    }
}
// Show customer record in the update form
function editCustomer(id) {
    fetch(`${'http://localhost:8080/api/v1'}/${id}`)
        .then(response => response.json())
        .then(customer => {
            document.getElementById('customerid').value = customer.id;
            document.getElementById('firstName').value = customer.firstName;
            document.getElementById('lastName').value = customer.lastName;
            document.getElementById('dateOfBirth').value = customer.dateOfBirth;
            document.getElementById('mobile').value = customer.mobile;
            document.getElementById('address1').value = customer.address1;
            document.getElementById('address2').value = customer.address2;
            document.getElementById('age').value = customer.age;
            document.getElementById('email').value = customer.email;

            const genderValue = customer.gender;
            if (genderValue === 'Male' || genderValue === 'Female' || genderValue === 'Other') {
                document.querySelector(`input[name="gender"][value="${genderValue}"]`).checked = true;
            } else {
                console.error(`Invalid gender value: ${genderValue}`);
            }
            document.getElementById('customer-form-modal').style.display = 'block';
            resetErrorMessages();
        });
}
//Delete customer's record 
function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        fetch(`${'http://localhost:8080/api/v1/delete'}/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                loadCustomers();
            }
        });
    }
}