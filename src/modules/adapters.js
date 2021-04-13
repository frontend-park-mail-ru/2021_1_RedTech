const MAX_DESCRIPTION_LENGTH = 240;

/**
 * Make object for render detail info about film from json.
 * @param {Object} jsonFilm - Info about film from json.
 * @return {Object} - Object for render detail info about film.
 */
export const filmJsonToFilm = (jsonFilm) => {
    const filmKeys = ['id', 'title', 'type', 'year', 'genres', 'director', 'countries', 'actors', 'description'];
    const film = {
        movieAvatar: `${jsonFilm.movie_avatar}`,
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
        });
        return newFilmsSeries;
    }, []);
};
