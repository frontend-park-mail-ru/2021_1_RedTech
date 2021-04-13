// eslint-disable-next-line no-unused-vars
const localUrl = 'http://localhost:8081';

// eslint-disable-next-line no-unused-vars
const deployUrl = 'https://redioteka.com';

const TOP_SLIDER_MEDIA_COUNT = 5;
const BOTTOM_SLIDER_MEDIA_COUNT = 10;

export const currentUrl = localUrl;

export const URLS = {
    pages: {
        main: '/',
        profile: '/profile',
    },
    api: {
        me: `${currentUrl}/api/me`,
        media: `${currentUrl}/api/media/movie/`,
        genres: `${currentUrl}/api/media/genres`,
        logout: `${currentUrl}/api/users/logout`,
        login: `${currentUrl}/api/users/login`,
        signup: `${currentUrl}/api/users/signup`,
        profile: `${currentUrl}/api/users/`,
        stream: `${currentUrl}/api/media/movie/1/stream`,
        topFilms: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}`,
        topSeries: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}`,
        genreFilms: `${currentUrl}/api/media/category/genre?limit=100&type=movie&genres=`,
        genreSeries: `${currentUrl}/api/media/category/genre?limit=100&type=series&genres=`,
        newSeries: `${currentUrl}/api/media/category/newest?limit=${BOTTOM_SLIDER_MEDIA_COUNT}&type=series`,
        newFilms: `${currentUrl}/api/media/category/newest?limit=${BOTTOM_SLIDER_MEDIA_COUNT}&type=movie`,
        topFilmsAndSeries: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}`,
    }
};