const application = document.getElementById('app');

const config = {
    menu: {
        href: '/menu',
        text: 'Меню!',
        open: menuPage,
    },
    login: {
        href: '/signup',
        text: 'Зарегистрироваться',
        open: signUpPage,
    }

}

function signUpPage() {
    application.innerHTML = '<div class="signup">\n' +
        '    <div class="signup_content">\n' +
        '        <div class="signup_title">\n' +
        '            Регистрация\n' +
        '        </div>\n' +
        '        <div class="signup_title-hint">\n' +
        '            Зарегистрируйтесь для просмотра фильмов и сериалов\n' +
        '        </div>\n' +
        '        <div class="signup_form">\n' +
        '            <div class="signup_form-content">\n' +
        '                <form>\n' +
        '                    <div class="signup_form-inputs">\n' +
        '                        <div class="signup_form-input-field">\n' +
        '                            <input class="signup_form-input" placeholder="Логин">\n' +
        '                        </div>\n' +
        '                        <div class="signup_form-input-field">\n' +
        '                            <input type="email" class="signup_form-input" placeholder="Email">\n' +
        '                        </div>\n' +
        '                        <div class="signup_form-input-field">\n' +
        '                            <input type="password" class="signup_form-input" placeholder="Пароль">\n' +
        '                        </div>\n' +
        '                        <div class="signup_form-input-field">\n' +
        '                            <input type="password" class="signup_form-input" placeholder="Подтвердите пароль">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="signup_form-hint">\n' +
        '                        Не менее 6 символов\n' +
        '                    </div>\n' +
        '                    <button class="signup_form-button">\n' +
        '                        Зарегистрироваться\n' +
        '                    </button>\n' +
        '                </form>\n' +
        '                <div class="signup_have-acc">\n' +
        '                    Уже зарегистрированы?\n' +
        '                    <a class="signup_have-acc-link" href="login.html">Войдите в аккаунт!</a>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
}

function menuPage() {
    application.innerHTML = '';

    Object
        .entries(config)
        .map(([menuKey, {text, href}]) => {
            const menuItem = document.createElement('a');
            menuItem.href = href;
            menuItem.textContent = text;
            menuItem.dataset.section = menuKey;

            return menuItem;
        })
        .forEach(element => application.appendChild(element))
    ;
}

menuPage();

application.addEventListener('click', e => {
    const {target} = e;

    if (target instanceof HTMLAnchorElement) {
        e.preventDefault();
        config[target.dataset.section].open();
    }
});
