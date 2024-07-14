const fields = [
    { title: 'Verteidigung', code: '1111' },
    { title: 'Internet', code: '2222' },
    { title: 'Kühler', code: '3333' },
    { title: 'GPU', code: '4444' },
    { title: 'Festplatte', code: '5555' },
    { title: 'CPU', code: '6666' },
];

document.addEventListener("DOMContentLoaded", () => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin) {
        document.querySelector('.admin-panel').style.display = 'flex';
        applyFieldColors();
        showFieldSettings();
    } else {
        showCurrentField();
    }

    const savedColor = readCookie('selectedColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }

    applyFieldColors();
    checkAllCodesEntered();
});

function showCurrentField() {
    let correctCodes = JSON.parse(localStorage.getItem('correctCodes')) || [];
    let currentIndex = correctCodes.length;

    for (let i = 1; i <= fields.length; i++) {
        document.getElementById(`field-${i}`).style.display = 'none';
    }

    if (currentIndex < fields.length) {
        document.getElementById(`field-${currentIndex + 1}`).style.display = 'flex';
    } else {
        checkAllCodesEntered();
    }
}

function checkCode(fieldIndex) {
    const inputCode = document.getElementById(`codeInput-${fieldIndex}`).value;
    const expectedCode = fields[fieldIndex - 1].code;

    if (inputCode === expectedCode) {
        alert("Code richtig!");
        addCorrectCode(expectedCode);
        document.getElementById(`field-${fieldIndex}`).style.display = 'none';
        showCurrentField();
    } else {
        alert("Code falsch. Bitte versuche es erneut.");
    }
}

function goBack() {
    window.location.href = "index.html";
}

function logoutAndGoBack() {
    sessionStorage.removeItem('isAdmin');
    showCurrentField();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'Johann' && password === 'johann') {
        alert("Login erfolgreich!");
        sessionStorage.setItem('isAdmin', 'true');
        window.location.href = "index.html";
    } else {
        alert("Falscher Benutzername oder Passwort.");
    }
}

function updateField() {
    const fieldNumber = document.getElementById('field-number').value;
    const newCode = document.getElementById('new-code').value;
    const newColor = document.getElementById('new-color').value;

    if (newCode.length === 4) {
        fields[fieldNumber - 1].code = newCode;
        saveFieldData();
        const field = document.querySelector(`#field-${fieldNumber}`);
        field.setAttribute('data-code', newCode);
        field.style.backgroundColor = newColor;
        saveFieldColor(fieldNumber, newColor);
        alert("Änderungen gespeichert!");
    } else {
        alert("Der Code muss 4-stellig sein.");
    }
}

function saveFieldColor(fieldNumber, color) {
    let fieldColors = JSON.parse(localStorage.getItem('fieldColors')) || {};
    fieldColors[fieldNumber] = color;
    localStorage.setItem('fieldColors', JSON.stringify(fieldColors));
}

function applyFieldColors() {
    const fieldColors = JSON.parse(localStorage.getItem('fieldColors')) || {};
    for (const fieldNumber in fieldColors) {
        const field = document.querySelector(`#field-${fieldNumber}`);
        if (field) {
            field.style.backgroundColor = fieldColors[fieldNumber];
        }
    }
}

function saveFieldData() {
    localStorage.setItem('fields', JSON.stringify(fields));
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
    if (correctCodes.length === fields.length) {
        document.getElementById('success-message').style.display = 'flex';
    }
}

function resetGame() {
    localStorage.removeItem('correctCodes');
    localStorage.removeItem('fieldColors');
    document.getElementById('success-message').style.display = 'none';
    window.location.href = "index.html";
}

function showFieldSettings() {
    const fieldNumber = document.getElementById('field-number').value;
    for (let i = 1; i <= fields.length; i++) {
        document.getElementById(`field-${i}`).style.display = 'none';
    }
    document.getElementById(`field-${fieldNumber}`).style.display = 'flex';
}

/*
     ______     ____
    /\/\/\/\   | "* \
  <|\/\/\/\/|_/  /__/
   |____________/
   |_|_|   /_/_/

*/ 
