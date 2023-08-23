const errorMessage = document.getElementById("errorMessage")

function validateEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
}

function showErrorMessage(content) {
    errorMessage.style.display = "block"
    errorMessage.textContent = content

    setTimeout(() => {
        errorMessage.style.display = "none"
        errorMessage.textContent = ''
    }, 5000)
}

function showSuccessMessage(content) {
    errorMessage.style.display = "block"
    errorMessage.style.color = "green"
    errorMessage.textContent = content

    setTimeout(() => {
        errorMessage.style.display = ""
        errorMessage.textContent = ''
        errorMessage.style.color = ""
    }, 5000)
}

export function checkEmail (email) {
    if (email === "") {
        showErrorMessage("You must enter an email!")
    } else {
        if (validateEmail(email)) {
            showSuccessMessage("Thank you for subscribing to our press peleases!")
        } else {
            showErrorMessage("Enter a valid email!")
        }
    }
}