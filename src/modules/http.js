import { URLS } from './urls.js';
import { filmJsonToFilm, arrayFilmsToFilmCards, arrayContentToNewFilmsSeries } from './adapters.js';

/**
 * Send async request to the server.
 * @param {Object} params - parameters for request.
 * @returns {Object} - returns status and parsed response.
 */
const sendRequest = async ({ url, method, body } = {}) => {
    const response = await fetch(url, {
        method: method,
        body: body,
        mode: 'cors',
        credentials: 'include',
    });

    try {
        const parsedJson = await response?.json();
        return {
            status: response.status,
            parsedJson,
        };
    } catch {
        return {
            status: response.status,
        };
    }
};

/**
 * Send async post request using async func.
 * @param {string} email - email parameter for request.
 * @param {string} password - password parameter for request.
 * @returns {boolean} - flag success of request.
 */
const postUserForLogin = async (email, password) => {
    if (!email || !password) {
        return false;
    }

    const params = {
        url: URLS.api.login,
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        })
    };

    try {
        const response = await sendRequest(params);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

/**
 * Send async post request using async func.
 * @param {string} username - username parameter for request.
 * @param {string} email - email parameter for request.
 * @param {string} password - password parameter for request.
 * @param {string} confirmPassword - confirm password parameter for request.
 * @returns {boolean} - flag success of request.
 */
const postUserForSignUp = async (username, email, password, confirmPassword) => {
    if (!username || !email || !password || !confirmPassword) {
        return false;
    }

    const params = {
        url: URLS.api.signup,
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirm_password: confirmPassword
        })
    };

    try {
        const response = await sendRequest(params);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

/**
 * Send async get request using async func.
 * @returns {Promise} - user id if you authorized, null in another case.
 */
const getCurrentUser = async () => {
    const params = {
        url: URLS.api.me,
        method: 'GET',
        credentials: 'include',
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return responseBody.id;
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {boolean} - flag success of request.
 */
const getLogout = async () => {
    const params = {
        url: URLS.api.logout,
        method: 'GET',
        credentials: 'include',
    };

    try {
        const response = await sendRequest(params);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

/**
 * Send async get request using async func.
 * @returns {Object} - response body with login, email and src of avatar.
 */
const getProfile = async (idUser) => {
    if (!idUser) {
        return null;
    }

    const params = {
        url: URLS.api.profile + idUser,
        method: 'GET',
        credentials: 'include'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return responseBody;
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async post request using async func.
 * @param {string} idUser - user id parameter for request.
 * @param {FormData} formPut - avatar for request.
 * @returns {string} - src of avatar.
 */
const postAvatar = async (idUser, formPut) => {
    if (!idUser || !formPut) {
        return null;
    }

    const params = {
        url: URLS.api.profile + idUser + '/avatar',
        method: 'PUT',
        credentials: 'include',
        body: formPut
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return responseBody.user_avatar;
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async patch request using async func.
 * @param {string} idUser - user id parameter for request.
 * @param {string} email - email parameter for request.
 * @param {string} login - login parameter for request.
 * @returns {boolean} - flag success of request.
 */
const patchProfile = async (idUser, email, login) => {
    if (!idUser || !email || !login) {
        return null;
    }

    const params = {
        url: URLS.api.profile + idUser,
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            username: login
        })
    };

    try {
        const response = await sendRequest(params);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

/**
 * Send async get request using async func.
 * @returns {Object} - detail info about film in object.
 */
const getDetailFilm = async (filmId) => {
    const params = {
        url: URLS.api.media + filmId,
        method: 'GET',
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return filmJsonToFilm(responseBody);
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {Array} - Array of objects for render top slider.
 */
const getTopFilmsAndSeries = async () => {
    const params = {
        url: URLS.api.topFilmsAndSeries,
        method: 'GET'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return arrayFilmsToFilmCards(responseBody.top);
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {Array} - Array of objects new films.
 */
const getNewFilms = async () => {
    const params = {
        url: URLS.api.newFilms,
        method: 'GET'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return arrayContentToNewFilmsSeries(responseBody.newest);
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {Array} - Array of objects new series.
 */
const getNewSeries = async () => {
    const params = {
        url: URLS.api.newSeries,
        method: 'GET'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return arrayContentToNewFilmsSeries(responseBody.newest);
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {Array} - Array of objects for render top slider.
 */
const getTopFilms = async () => {
    const params = {
        url: URLS.api.topFilms,
        method: 'GET'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return arrayFilmsToFilmCards(responseBody.top);
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {Array} - Array of objects for render top slider.
 */
const getTopSeries = async () => {
    const params = {
        url: URLS.api.topSeries,
        method: 'GET'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return arrayFilmsToFilmCards(responseBody.top);
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {Array} - Array of objects for render bottom slider.
 */
const getGenreFilms = async (genreName) => {
    const params = {
        url: URLS.api.genreFilms + genreName,
        method: 'GET'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return arrayContentToNewFilmsSeries(responseBody.genre);
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {Array} - Array of objects for render bottom slider.
 */
const getGenreSeries = async (genreName) => {
    const params = {
        url: URLS.api.genreSeries + genreName,
        method: 'GET'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return arrayContentToNewFilmsSeries(responseBody.genre);
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {Array} - Array of objects for render favourite page.
 */
const getFavourites = async (userId) => {
    const params = {
        url: URLS.api.profile + userId + '/media',
        method: 'GET'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return arrayContentToNewFilmsSeries(responseBody.favourites);
        }
        return null;
    } catch (err) {
        return null;
    }
};

const getGenres = async () => {
    const params = {
        url: URLS.api.genres,
        method: 'GET'
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return responseBody;
        }
        return null;
    } catch (err) {
        return null;
    }
};

/**
 * Send async get request using async func.
 * @returns {boolean} - Is status of post request add to favourites equal to 200.
 */
const postAddToFavourites = async (contentId) => {
    const params = {
        url: URLS.api.media + contentId + '/favourites?action=save',
        method: 'POST'
    };
    try {
        const response = await sendRequest(params);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

/**
 * Send async get request using async func.
 * @returns {boolean} - Is status of post request remove from favourites equal to 200.
 */
const postRemoveFromFavourites = async (contentId) => {
    const params = {
        url: URLS.api.media + contentId + '/favourites?action=delete',
        method: 'POST'
    };
    try {
        const response = await sendRequest(params);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};


const postLike = async (contentId) => {
    const params = {
        url: URLS.api.media + contentId + '/like',
        method: 'POST'
    };
    try {
        const response = await sendRequest(params);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

const postDislike = async (contentId) => {
    const params = {
        url: URLS.api.media + contentId + '/dislike',
        method: 'POST'
    };
    try {
        const response = await sendRequest(params);
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

export {
    postUserForLogin,
    postUserForSignUp,
    getCurrentUser,
    getLogout,
    getProfile,
    postAvatar,
    patchProfile,
    getDetailFilm,
    getTopFilmsAndSeries,
    getNewFilms,
    getNewSeries,
    getTopFilms,
    getGenreFilms,
    getTopSeries,
    getGenreSeries,
    getFavourites,
    postAddToFavourites,
    postRemoveFromFavourites,
    getGenres,
    postLike,
    postDislike
};
