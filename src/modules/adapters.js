import { currentUrl } from './urls.js';

export const jsonFilmToFilm = (jsonFilm) => {
    const filmKeys = ['title', 'type', 'year', 'genres', 'director', 'countries', 'actors', 'description'];
    const film = {
        movieAvatar: `${currentUrl}${jsonFilm.movie_avatar}`,
        rating: `Положительных оценок ${jsonFilm.rating ?? ''}`,
    };

    filmKeys.forEach((value) => {
        film[value] = jsonFilm[value];
    });
    return film;
};