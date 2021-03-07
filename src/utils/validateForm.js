/**
 * Check validation of form.
 * Calls others functions to check validations of every type of input.
 * @param {Element} form - form for validation
 */
export const validateForm = (form) => {
    if(form === undefined) {
        return;
    }

    const inputs = form.querySelectorAll('.input-field__input');

    form.addEventListener(('submit'), event => {

        event.preventDefault();

        inputs.forEach((input) => {
            document.getElementById(input.id + 'Error').textContent = '';
        })

        inputs.forEach((input) => {
            const errorDiv = document.getElementById(input.id + 'Error');

            if(!input.value) {
                errorDiv.textContent = 'Это поле обязательно к заполнению';
                event.preventDefault();
            } else {
                switch (input.id) {
                    case 'email':
                        validateEmail(input.value, errorDiv);
                        break;
                    case 'login':
                        validateLogin(input.value, errorDiv);
                        break;
                    case 'password':
                        validatePassword(input.value, errorDiv);
                        break;
                    case 'confirmPassword':
                        validateConfirmPassword(input.value, errorDiv);
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
 */
const validateLogin = (login, errorDiv) => {
    if(!/^[a-zA-Z](.[a-zA-Z0-9]*)$/.test(login)) {
        errorDiv.textContent = 'Логин должен содержать только латинские буквы и цифры';
        event.preventDefault();
    }
}

/**
 * Check validation of inputted email.
 * @param {string} email - value of email input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 */
const validateEmail = (email, errorDiv) => {
    if(!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)) {
        errorDiv.textContent = 'Введен некорректный email';
        event.preventDefault();
    }
}

/**
 * Check validation of inputted password.
 * @param {string} password - value of login input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 */
const validatePassword = (password, errorDiv) => {
    if (password.length < 8 || password.length > 50) {
        errorDiv.textContent = 'Пароль должен быть длиной от 8 до 50 символов';
        event.preventDefault();
    }
}

/**
 * Check validation of inputted password for confirmation.
 * @param {string} confirmPassword - value of password for confirmation input to be validated.
 * @param {HTMLElement} errorDiv - div element, where will be printed message of error.
 */
const validateConfirmPassword = (confirmPassword, errorDiv) => {
    const password = document.getElementById('password').value;

    if (confirmPassword !== password) {
        errorDiv.textContent = 'Пароли не совпадают!';
    }
}
