import { URLS } from './urls.js';

/**
 * Send async response to the server with parsed params.
 * @param {Object} params - parameters for response.
 * @returns {Object} - returns status and parsed respond.
 */
async function asyncGetUsing(params = {}) {
    const response = await fetch(params.url, {
        method: params.method,
        body: JSON.stringify(params.body),
        mode: 'cors',
        credentials: 'include',
    });

    const parsedJson = await response.json() ?? {};

    return {
        status: response.status,
        parsedJson,
    };
}

/**
 * Send async response to the server, using for send avatar.
 * @param {Object} params - parameters for response.
 * @returns {Object} - returns status and parsed respond.
 */
async function asyncGetUsingAvatar(params = {}) {
    const response = await fetch(params.url, {
        method: params.method,
        body: params.body,
        mode: 'cors',
        credentials: 'include',
    });

    const parsedJson = await response.json();

    return {
        status: response.status,
        parsedJson,
    };
}

/**
 * Send async post response using async func asyncGetUsing.
 * @param {string} email - email parameter for response.
 * @param {string} password - password parameter for response.
 * @returns {int} - status from respond.
 */
async function postUserForLogin(email, password) {
    const params = {
        url: URLS.api.login,
        method: 'POST',
        body: {
            email: email,
            password: password
        }
    };

    return (await asyncGetUsing(params)).status;
}

/**
 * Send async post response using async func asyncGetUsing.
 * @param {string} username - username parameter for response.
 * @param {string} email - email parameter for response.
 * @param {string} password - password parameter for response.
 * @param {string} confirmPassword - confirm password parameter for response.
 * @returns {int} - status from respond.
 */
async function postUserForSignUp(username, email, password, confirmPassword) {
    const params = {
        url: URLS.api.signup,
        method: 'POST',
        credentials: 'include',
        body: {
            username: username,
            email: email,
            password: password,
            confirm_password: confirmPassword
        }
    };

    return (await asyncGetUsing(params)).status;
}

/**
 * Send async get response using async func asyncGetUsing.
 * @returns {Object} - object from async func asyncGetUsing.
 */
async function getCurrentUser() {
    const params = {
        url: URLS.api.me,
        method: 'GET',
        credentials: 'include',
    };

    return await asyncGetUsing(params);
}

/**
 * Send async get response using async func asyncGetUsing.
 * @returns {int} - status from respond.
 */
async function getLogout() {
    const params = {
        url: URLS.api.logout,
        method: 'GET',
        credentials: 'include',
    };

    return (await asyncGetUsing(params)).status;
}

/**
 * Send async get response using async func asyncGetUsing.
 * @returns {Object} - object from async func asyncGetUsing.
 */
async function getProfile(idUser) {
    const params = {
        url: URLS.api.profile + idUser,
        method: 'GET',
        credentials: 'include'
    };

    return await asyncGetUsing(params);
}

/**
 * Send async post response using async func asyncGetUsingAvatar.
 * @param {string} idUser - user id parameter for response.
 * @param {FormData} formPut - avatar for response.
 * @returns {int} - object from async func asyncGetUsing.
 */
async function postAvatar(idUser, formPut) {
    const params = {
        url: URLS.api.profile + idUser + '/avatar',
        method: 'PUT',
        credentials: 'include',
        body: formPut
    };

    return await asyncGetUsingAvatar(params);
}

/**
 * Send async patch response using async func asyncGetUsingAvatar.
 * @param {string} idUser - user id parameter for response.
 * @param {string} email - email parameter for response.
 * @param {string} login - login parameter for response.
 * @returns {int} - status from respond.
 */
async function patchProfile(idUser, email, login) {
    const params = {
        url: URLS.api.profile + idUser,
        method: 'PATCH',
        credentials: 'include',
        body: {
            email: email,
            username: login
        }
    };

    return (await asyncGetUsing(params)).status;
}

/**
 * Send async get response using async func asyncGetUsing.
 * @returns {Object} - object from async func asyncGetUsing.
 */
async function getDetailFilmPage() {
    const params = {
        url: URLS.api.media,
        method: 'GET',
    };

    return await asyncGetUsing(params);
}

export {
    postUserForLogin,
    postUserForSignUp,
    getCurrentUser,
    getLogout,
    getProfile,
    postAvatar,
    patchProfile,
    getDetailFilmPage
};
