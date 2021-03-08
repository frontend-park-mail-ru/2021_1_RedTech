/**
 * Check validation of form.
 * Calls others functions to check validations of every type of input.
 * @param {Element} form - form for validation.
 * @returns {boolean} - is valid form or not.
 */
export const isValidForm = (form) => {

    if (form === undefined) {
        return false;
    }

    const inputs = form.querySelectorAll('.input-wrapper__input');

    inputs.forEach((input) => {
        const error = document.getElementById(input.id + 'Error');
        if (error) {
            error.textContent = '';
        }
        input.classList.remove('input-wrapper__input_error');
    })

    let isValid = true;

    inputs.forEach((input) => {
        const errorDiv = document.getElementById(input.id + 'Error');

        if (errorDiv) {

            if (!input.value) {
                errorDiv.textContent = 'Это поле обязательно к заполнению';
                input.classList.add('input-wrapper__input_error');
                isValid &= false;
            } else {
                switch (input.id) {
                    case 'email':
                        isValid &= isValidEmail(input, errorDiv);
                        break;
                    case 'login':
                        isValid &= isValidLogin(input, errorDiv);
                        break;
                    case 'password':
                        isValid &= isValidPassword(input, errorDiv);
                        break;
                    case 'confirmPassword':
                        isValid &= isValidConfirmPassword(input, errorDiv);
                        break;
                    case 'firstName':
                        isValid &= isValidName(input, errorDiv)
                        break;
                    case 'secondName':
                        isValid &= isValidName(input, errorDiv)
                        break;
                }
            }
        }
    });

    return isValid;
}

/**
 * Check validation of inputted login.
 * @param {Element} loginInput - element login input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 * @returns {boolean} - is valid login form or not.
 */
const isValidLogin = (loginInput, errorDiv) => {
    if (!/^[a-zA-Z](.[a-zA-Z0-9]*)$/.test(loginInput.value)) {
        errorDiv.textContent = 'Логин должен содержать только латинские буквы и цифры';
        loginInput.classList.add('input-wrapper__input_error');
        return false;
    }
    return true;
}

/**
 * Check validation of inputted na,e.
 * @param {Element} nameInput - element name input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 * @returns {boolean} - is valid name form or not.
 */
const isValidName = (nameInput, errorDiv) => {
    if (!/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/. test(nameInput.value)) {
        errorDiv.textContent = 'Некорректно введены данные';
        nameInput.classList.add('input-wrapper__input_error');
        return false;
    }
    return true;
}

/**
 * Check validation of inputted email.
 * @param {Element} emailInput - element email input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 * @returns {boolean} - is valid email form or not.
 */
const isValidEmail = (emailInput, errorDiv) => {
    if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(emailInput.value)) {
        errorDiv.textContent = 'Введен некорректный email';
        emailInput.classList.add('input-wrapper__input_error');
        return false;
    }
    return true;
}

/**
 * Check validation of inputted password.
 * @param {Element} passwordInput - element login input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 * @returns {boolean} - is valid password form or not.
 */
const isValidPassword = (passwordInput, errorDiv) => {
    if (passwordInput.value.length < 8 || passwordInput.value.length > 50) {
        errorDiv.textContent = 'Пароль должен быть длиной от 8 до 50 символов';
        passwordInput.classList.add('input-wrapper__input_error');
        return false;
    }
    return true;
}

/**
 * Check validation of inputted password for confirmation.
 * @param {Element} confirmPasswordInput - element password for confirmation input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 * @returns {boolean} - is valid confirm password form or not.
 */
const isValidConfirmPassword = (confirmPasswordInput, errorDiv) => {
    const password = document.getElementById('password').value;

    if (confirmPasswordInput.value !== password) {
        errorDiv.textContent = 'Пароли не совпадают!';
        confirmPasswordInput.classList.add('input-wrapper__input_error');
        return false;
    }
    return true;
}

