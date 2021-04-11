import { currentUrl } from '../consts/urls.js';

/**
 * Make object for render detail info about film from json.
 * @param {Object} jsonFilm - Info about film from json.
 * @return {Object} - Object for render detail info about film.
 */
export const filmJsonToFilm = (jsonFilm) => {
    const filmKeys = ['title', 'type', 'year', 'genres', 'director', 'countries', 'actors', 'description'];
    const film = {
        movieAvatar: `${currentUrl}${jsonFilm.movie_avatar}`,
        rating: jsonFilm.rating ? `Положительных оценок ${jsonFilm.rating}` : '',
    };

    filmKeys.forEach((value) => {
        film[value] = jsonFilm[value];
    });
    return film;
};

/**
 * Make array of object for render top slider from respond json.
 * @param {Array} arrayFilms - Info about film from json.
 * @return {Array} - Array of objects for render top slider.
 */
export const arrayFilmsToFilmCards = (arrayFilms) => {
    const filmCards = [];

    arrayFilms.reduce((_, jsonFilm) => {
        filmCards.push({
            id: jsonFilm.id,
            title: jsonFilm.title,
            description: jsonFilm.description,
            movieAvatar: `${currentUrl}${jsonFilm.movie_avatar}`,
            stars: '* '.repeat(jsonFilm.rating),
            href: `/movie/${jsonFilm.id}`,
        });
    });

    return filmCards;
};

/**
 * Make array of object for render bottom slider from respond json.
 * @param {Array} arrayContent - Info about film from json.
 * @return {Object} - Array of objects for render bottom slider.
 */
export const arrayContentToNewFilmsSeries = (arrayContent) => {
    const newFilmsSeries = [];

    arrayContent.reduce((_, jsonFilm) => {
        newFilmsSeries.push({
            id: jsonFilm.id,
            title: jsonFilm.title,
            movieAvatar: `${currentUrl}${jsonFilm.movie_avatar}`,
            status: jsonFilm.is_free ? 'Бесплатно' : 'Подписка',
            href: `/movie/${jsonFilm.id}`,
        });
    });

    return newFilmsSeries;
};
