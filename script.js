function redirectToCodePage(element) {
    const code = element.getAttribute('data-code');
    sessionStorage.setItem('expectedCode', code);
    window.location.href = "code.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin) {
        document.querySelector('.admin-panel').style.display = 'flex';
    } else {
        const expectedCode = sessionStorage.getItem('expectedCode');
        if (expectedCode) {
            const inputField = document.getElementById('codeInput');
            const submitButton = document.querySelector('button');

            function checkCode() {
                const inputCode = inputField.value;
                if (inputCode === expectedCode) {
                    alert("Code richtig!");
                    sessionStorage.removeItem('expectedCode');
                    addCorrectCode(expectedCode);
                    window.location.href = "index.html";
                } else {
                    alert("Code falsch. Bitte versuche es erneut.");
                }
            }

            submitButton.addEventListener('click', checkCode);

            inputField.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    checkCode();
                }
            });
        }
    }

    const savedColor = readCookie('selectedColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }

    checkAllCodesEntered();
});

function goBack() {
    window.location.href = "index.html";
}

function logoutAndGoBack() {
    sessionStorage.removeItem('isAdmin');
    window.location.href = "index.html";
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'Code-Crack' && password === 't847GT4T') {
        alert("Login erfolgreich!");
        sessionStorage.setItem('isAdmin', 'true');
        window.location.href = "index.html";
    } else {
        alert("Benutzername oder Passwort falsch");
    }
}

function updateField() {
    const fieldNumber = document.getElementById('field-number').value;
    const newCode = document.getElementById('new-code').value;
    const newColor = document.getElementById('new-color').value;

    if (newCode.length === 4) {
        const field = document.querySelector(`.field:nth-child(${fieldNumber})`);
        field.setAttribute('data-code', newCode);
        field.style.backgroundColor = newColor;
        alert("Änderungen gespeichert!");
    } else {
        alert("Der Code muss 4-stellig sein.");
    }
}

function changeColorByHex() {
    const hexCode = document.getElementById('hexInput').value;
    document.body.style.backgroundColor = hexCode;
    createCookie('selectedColor', hexCode, 365);
}

function createCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function addCorrectCode(code) {
    let correctCodes = JSON.parse(localStorage.getItem('correctCodes')) || [];
    if (!correctCodes.includes(code)) {
        correctCodes.push(code);
        localStorage.setItem('correctCodes', JSON.stringify(correctCodes));
    }
    checkAllCodesEntered();
}

function checkAllCodesEntered() {
    let correctCodes = JSON.parse(localStorage.getItem('correctCodes')) || [];
    if (correctCodes.length === 6) {
        document.getElementById('success-message').style.display = 'flex';
    }
}

function resetGame() {
    localStorage.removeItem('correctCodes');
    document.getElementById('success-message').style.display = 'none';
}




/*   ______     ____
    /\/\/\/\   | "* \
  <|\/\/\/\/|_/  /__/
   |____________/
   |_|_|   /_/_/
*/