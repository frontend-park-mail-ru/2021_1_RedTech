import { currentUrl } from './urls.js';

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

export const arrayFilmsToFilmCards = (arrayFilms) => {
    const filmCards = [];

    arrayFilms.forEach((jsonFilm) => {
        filmCards.push({
            id: jsonFilm.id,
            title: jsonFilm.title,
            description: jsonFilm.description,
            movieAvatar: `${currentUrl}${jsonFilm.movie_avatar}`,
            stars: '* '.repeat(jsonFilm.rating)
        });
    });

    return filmCards;
};

export const arrayContentToNewFilmsSeries = (arrayContent) => {
    const newFilmsSeries = [];

    arrayContent.forEach((jsonFilm) => {
        newFilmsSeries.push({
            id: jsonFilm.id,
            title: jsonFilm.title,
            movieAvatar: `${currentUrl}${jsonFilm.movie_avatar}`,
            status: jsonFilm.is_free ? 'Бесплатно' : 'Подписка',
        });
    });

    return newFilmsSeries;
};
