import { insertSpaceAfterComa, numToFixTruth } from './utils.js';
import { URLS } from '../consts/urls.js';

const MAX_DESCRIPTION_LENGTH = 200;

/**
 * Make object for render detail info about film from json.
 * @param {Object} jsonFilm - Info about film from json.
 * @return {Object} - Object for render detail info about film.
 */
export const filmJsonToFilm = (jsonFilm) => {
    const filmKeys = ['id', 'title', 'type', 'year', 'description', 'is_free', 'availability'];
    const film = {
        genres: insertSpaceAfterComa(jsonFilm.genres),
        director: insertSpaceAfterComa(jsonFilm.director),
        actors: jsonFilm?.actors,
        countries: insertSpaceAfterComa(jsonFilm.countries),
        movieAvatar: `${jsonFilm.movie_avatar}`,
        rating: jsonFilm.rating ? `Рейтинг ${numToFixTruth(jsonFilm.rating)} / 10.0` : '',
        is_fav: jsonFilm?.is_fav,
        is_vote: jsonFilm?.is_vote,
        currentUrl: URLS.api.actors,
        seriesList: jsonFilm?.series_list,
    };

    filmKeys.forEach((value) => {
        film[value] = jsonFilm[value];
    });
    return film;
};

/**
 * Make object for render search body.
 * @param {Object} searchJson - Search info from json.
 * @return {Object} - Object for render search body.
 */
export const searchJsonToSearchItem = (searchJson) => {
    const actors = searchJson.actors?.reduce((actorSearchItems, actor) => {
        actorSearchItems.push({
            name: actor.first_name + ' ' + actor.last_name,
            id: actor.id,
        });
        return actorSearchItems;
    }, []);

    const movies = searchJson.movies?.reduce((moviesSearchItems, movie) => {
        moviesSearchItems.push({
            name: movie.title,
            id: movie.id,
            type: movie.type,
        });
        return moviesSearchItems;
    }, []);
    return {
        actors: actors,
        movies: movies,
    };
};

/**
 * Make array of object for render top slider from respond json.
 * @param {Array} arrayFilms - Info about film from json.
 * @return {Array} - Array of objects for render top slider.
 */
export const arrayFilmsToFilmCards = (arrayFilms) => {
    return arrayFilms.reduce((filmCards, jsonFilm) => {
        let description = jsonFilm?.description;
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            description = description.substr(0, MAX_DESCRIPTION_LENGTH);
            const to = description.lastIndexOf(' ');
            description = description.substr(0, to);
            description += '...';
        }
        filmCards.push({
            id: jsonFilm?.id,
            title: jsonFilm?.title,
            description: description,
            movieAvatar: `${jsonFilm?.movie_avatar}`,
            href: `/movie/${jsonFilm.id}`,
            isFree: jsonFilm.is_free,
        });
        return filmCards;
    }, []);
};

/**
 * Make array of object for render bottom slider from respond json.
 * @param {Array} arrayContent - Info about film from json.
 * @return {Object} - Array of objects for render bottom slider.
 */
export const arrayContentToNewFilmsSeries = (arrayContent) => {
    return arrayContent.reduce((newFilmsSeries, jsonFilm) => {
        newFilmsSeries.push({
            id: jsonFilm?.id,
            title: jsonFilm?.title,
            movieAvatar: `${jsonFilm?.movie_avatar}`,
            status: jsonFilm?.is_free ? 'Бесплатно' : 'Подписка',
            href: `/movie/${jsonFilm.id}`
        });
        return newFilmsSeries;
    }, []);
};

/**
 * Make array of object for render actorPage.
 * @param {Object} actorInfoJson - Info about actor from json.
 * @return {Object} - InfoAboutActor.
 */
export const arrayContentToActorPageContent = (actorInfoJson) => (
    {
        name: actorInfoJson.first_name + ' ' + actorInfoJson.last_name,
        born: actorInfoJson.born,
        actor_avatar: actorInfoJson.actor_avatar,
        movies: arrayContentToNewFilmsSeries(actorInfoJson.movies),
    }
);

/**
 * Check is needed to get csrf token
 * @param {Object} responseBody - Response body.
 * @return {boolean} - Is needed to get csrf token.
 */
export const checkCSRFToken = (responseBody) => {
    return responseBody.message === 'no csrf-token';
};
