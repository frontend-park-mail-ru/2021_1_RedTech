import { URLS } from './urls.js';
import { jsonFilmToFilm } from './adapters.js';

export async function asyncGetUsing(params = {}) {
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

export async function asyncGetUsingAvatar(params = {}) {
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

export async function getHomeFilms() {
    const params = {
        url: URLS.api.media,
        method: 'GET',
    };

    asyncGetUsing(params).then(({status, parsedJson}) => {
        if (status < 300) {
            jsonFilmToFilm(parsedJson);
        }
    });
}

