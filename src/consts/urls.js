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
        logout: `${currentUrl}/api/users/logout`,
        login: `${currentUrl}/api/users/login`,
        signup: `${currentUrl}/api/users/signup`,
        profile: `${currentUrl}/api/users/`,
        topFilms: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}`,
        topSeries: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}`,
        genreFilms: `${currentUrl}/api/media/category/genre?limit=100&type=movie&genres=`,
        genreSeries: `${currentUrl}/api/media/category/genre?limit=100&type=series&genres=`,
        newSeries: `${currentUrl}/api/media/category/newSeries?limit=${BOTTOM_SLIDER_MEDIA_COUNT}`,
        newFilms: `${currentUrl}/api/media/category/newFilms?limit=${BOTTOM_SLIDER_MEDIA_COUNT}`,
        topFilmsAndSeries: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}`,
    }
};