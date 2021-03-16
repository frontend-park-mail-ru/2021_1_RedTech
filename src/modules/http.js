import {DetailComponent} from '../views/DetailView/DetailView.js';
import {APPLICATION} from '../main.js';
import {URLS} from './urls.js';

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
    let params = {
        url: URLS.api.media,
        method: 'GET',
    };

    let film = {};

    asyncGetUsing(params).then(({status, parsedJson}) => {
        if (status < 300) {
            film.mainImageSrc = './assets/gravity.jpg';
            film.mediaTitle = parsedJson.title;
            film.mediaTag = 'Сериал';
            film.mediaRank = 'Положительных оценок ' + `${parsedJson.rating}` ?? '';
            film.mediaYear = 2016;
            film.mediaGenres = parsedJson.genres ?? '';
            film.mediaDirector = 'Алекс Хирш';
            film.mediaCountry = parsedJson.countries ?? '';
            film.mediaActors = parsedJson.actors ?? '';
            film.mediaDescription = parsedJson.description ?? '';
        }
    });
}
