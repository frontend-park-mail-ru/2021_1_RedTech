import { currentUrl } from './urls.js';

export const filmJsonToFilm = (jsonFilm) => {
    const filmKeys = ['title', 'type', 'year', 'genres', 'director', 'countries', 'actors', 'description'];
    const film = {
        movieAvatar: `${currentUrl}${jsonFilm.movie_avatar}`,
        rating: jsonFilm.rating !== undefined ? `Положительных оценок ${jsonFilm.rating}` : '',
    };

    filmKeys.forEach((value) => {
        film[value] = jsonFilm[value];
    });
    return film;
};
