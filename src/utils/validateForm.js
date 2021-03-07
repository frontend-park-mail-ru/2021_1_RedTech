/**
 * Check validation of form.
 * Calls others functions to check validations of every type of input.
 * @param {HTMLFormElement} form - form for validation
 */
export const validateForm = (form) => {
    const inputs = form.querySelectorAll('.input-field__input');

    form.addEventListener(('submit'), function (event) {

        inputs.forEach((input) => {
            document.getElementById(input.id + 'Error').textContent = '';
        })

        inputs.forEach((input) => {
            const errorDiv = document.getElementById(input.id + 'Error');

            if(!input.value) {
                errorDiv.textContent = 'Это поле обязательно к заполнению';
            } else {
                switch (input.id) {
                    case 'email':
                        validateEmail(input.value, errorDiv, event);
                        break;
                    case 'login':
                        validateLogin(input.value, errorDiv, event);
                        break;
                    case 'password':
                        validatePassword(input.value, errorDiv, event);
                        break;
                    case 'confirmPassword':
                        validateConfirmPassword(input.value, errorDiv, event);
                        break;
                }
            }
        });
    });
}

/**
 * Check validation of inputted login.
 * @param {string} login - value of login input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 * @param {Event} event - in case of validation fail, event will be prevented.
 */
const validateLogin = (login, errorDiv, event) => {
    if(!/^[a-zA-Z](.[a-zA-Z0-9]*)$/.test(login)) {
        errorDiv.textContent = 'Логин должен содержать только латинские буквы и цифры.' +
                               ' Первый символ логина может быть только буквенным';
        event.preventDefault();
    }
}

/**
 * Check validation of inputted email.
 * @param {string} email - value of email input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 * @param {Event} event - in case of validation fail, event will be prevented.
 */
const validateEmail = (email, errorDiv, event) => {
    if(!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)) {
        errorDiv.textContent = 'Введен некорректный почтовый адрес';
        event.preventDefault();
    }
}

/**
 * Check validation of inputted password.
 * @param {string} password - value of login input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 * @param {Event} event - in case of validation fail, event will be prevented.
 */
const validatePassword = (password, errorDiv, event) => {
    if (password.length < 8 || password.length > 50) {
        errorDiv.textContent = 'Пароль должен быть длиной от 8 до 50 символов';
        event.preventDefault();
    }
}

/**
 * Check validation of inputted password for confirmation.
 * @param {string} confirmPassword - value of password for confirmation input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 * @param {Event} event - in case of validation fail, event will be prevented.
 */
const validateConfirmPassword = (confirmPassword, errorDiv, event) => {
    const password = document.getElementById('password').value;

    if (confirmPassword !== password) {
        errorDiv.textContent = 'Пароли не совпадают!';
        event.preventDefault();
    }
}
