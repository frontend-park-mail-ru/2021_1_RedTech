const application = document.getElementById('app');

const config = {
    menu: {
        href: '/menu',
        text: 'Меню!',
        open: menuPage,
    },
    signup: {
        href: '/signup',
        text: 'Зарегистрироваться',
        open: signUpPage,
    },
    login: {
        href: '/login',
        text: 'Войти',
        open: loginPage,
    }

}

const inputsForSignUp = {
    login: {
        placeholder: 'Логин',
    },
    email: {
        placeholder: 'Email',
        type: 'email',
    },
    password: {
        placeholder: 'Пароль',
        type: 'password',
    },
    confirmPassword: {
        placeholder: 'Подтвердите пароль',
        type: 'password',
    }
}

const inputsForLogin = {
    email: {
        placeholder: 'Email',
        type: 'email',
    },
    password: {
        placeholder: 'Пароль',
        type: 'password',
    }
}

const networksAuth = {
    google: {
        src: 'img/google.svg',
    },
    facebook: {
        src: 'img/facebook.svg',
    },
    vk: {
        src: 'img/vk.svg',
    }
}

const appendTag = (tagName, className, text, parentName) => {
    let tag = document.createElement(tagName);

    if (className !== undefined) {
        tag.className = className;
    }

    if (text !== undefined) {
        tag.textContent = text;
    }

    if (parentName !== undefined) {
        const elements = application.getElementsByClassName(parentName);
        elements.item(0).appendChild(tag);
    } else {
        application.appendChild(tag);
    }

    return tag;
}

const fillFormTag = (tagName, className, text) => {
    let tag = document.createElement(tagName);

    if (className !== undefined) {
        tag.className = className;
    }

    if (text !== undefined) {
        tag.textContent = text;
    }

    application.getElementsByTagName('form').item(0).appendChild(tag);
}

const fillInputs = (isSignUp) => {

    let data = isSignUp ?  inputsForSignUp : inputsForLogin

    Object
        .entries(data)
        .map(([inputKey, {placeholder, type}]) => {
            const divForInput = appendTag('div','inputs__input-field',null, 'form-content__inputs');

            const inputItem = document.createElement('input')
            inputItem.className = 'input-field__input';
            inputItem.placeholder = placeholder

            if (type !== undefined) {
                inputItem.type = type
            }

            divForInput.appendChild(inputItem)
        })
    ;
}

const createATag = (className, href, text) => {
    const aTag = document.createElement('a');

    if (className !== undefined) {
        aTag.className = className;
    }

    if (href !== undefined) {
        aTag.href = href;
    }

    if (text !== undefined) {
        aTag.text = text
    }

    return aTag;
}

const fillAuth = () => {
    appendTag('div', 'form-content__networks', null, 'form__form-content');
    appendTag('div','networks__title', 'Или войдите с помощью социальных сетей', 'form-content__networks');
    appendTag('div', 'networks__content', null, 'form-content__networks');

    Object
        .entries(networksAuth)
        .map(([, {src}]) => {
            const networkDiv = appendTag('div','networks__img',null, 'networks__content');
            //const networkBtn = appendTag('button','networks__button',null, 'networks__img');

            const networkBtn = document.createElement('button');
            networkBtn.className = 'networks__button';
            networkDiv.appendChild(networkBtn)

            const inputItem = document.createElement('img')
            inputItem.className = 'networks__img';
            inputItem.src = src

            networkBtn.appendChild(inputItem)
        });

}

function signUpPage() {
    application.innerHTML = '';
    appendTag('div','login-signup');
    appendTag('div','login-signup__content',null, 'login-signup');
    appendTag('div','content__title', 'Регистрация', 'login-signup__content');
    appendTag('div','content__title-hint', 'Зарегистрируйтесь для просмотра фильмов и сериалов', 'login-signup__content');
    appendTag('div','content__form', null,'login-signup__content');
    appendTag('div','form__form-content', null, 'content__form');
    appendTag('form', null, null, 'form__form-content');

    fillFormTag('div', 'form-content__inputs');
    fillFormTag('div', 'form-content__hint', 'Не менее 6 символов');
    fillFormTag('button', 'form-content__button', 'Зарегистрироваться');

    fillInputs(true);

    const divForHint = appendTag('div', 'form-content__have-acc', 'Уже зарегистрированы?', 'form__form-content');
    divForHint.appendChild(createATag('have-acc__link', 'login.html', 'Войдите в аккаунт!'))

}

function loginPage() {
    application.innerHTML = '';
    appendTag('div','login-signup');
    appendTag('div','login-signup__content',null, 'login-signup');
    appendTag('div','content__title', 'Вход', 'login-signup__content');
    appendTag('div','content__title-hint', 'Войдите для доступа к подписке и списку избранного', 'login-signup__content');
    appendTag('div','content__form', null,'login-signup__content');
    appendTag('div','form__form-content', null, 'content__form');
    appendTag('form', null, null, 'form__form-content');

    fillFormTag('div', 'form-content__inputs');
    fillFormTag('div', 'form-content__hint', 'Забыли пароль?');
    fillFormTag('button', 'form-content__button', 'Войти');

    fillInputs(false);

    fillAuth();

    const divForHint = appendTag('div', 'form-content__have-acc', 'Еще нет аккаунта?', 'form__form-content');
    divForHint.appendChild(createATag('have-acc__link', 'login.html', 'Зарегистрируйтесь!'));

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
