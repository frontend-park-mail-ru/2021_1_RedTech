// eslint-disable-next-line no-unused-vars
const localUrl = 'http://localhost:8081';

// eslint-disable-next-line no-unused-vars
const deployUrl = 'https://redioteka.com';

const TOP_SLIDER_MEDIA_COUNT = 5;
const BOTTOM_SLIDER_MEDIA_COUNT = 10;

export const currentUrl = deployUrl;

export const URLS = {
    pages: {
        main: '/',
        profile: '/profile',
    },
    api: {
        cancelSubcription: `${currentUrl}/api/subscriptions`,
        me: `${currentUrl}/api/me`,
        csrf: `${currentUrl}/api/csrf`,
        media: `${currentUrl}/api/media/movie/`,
        genres: `${currentUrl}/api/media/genres`,
        logout: `${currentUrl}/api/users/logout`,
        login: `${currentUrl}/api/users/login`,
        signup: `${currentUrl}/api/users/signup`,
        profile: `${currentUrl}/api/users/`,
        search: `${currentUrl}/api/search?`,
        actors: `${currentUrl}/api/actors/`,
        topFilms: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}&type=movie`,
        topSeries: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}&type=series`,
        genreFilms: `${currentUrl}/api/media/category/genre?limit=100&type=movie&genres=`,
        genreSeries: `${currentUrl}/api/media/category/genre?limit=100&type=series&genres=`,
        newSeries: `${currentUrl}/api/media/category/newest?limit=${BOTTOM_SLIDER_MEDIA_COUNT}&type=series`,
        newFilms: `${currentUrl}/api/media/category/newest?limit=${BOTTOM_SLIDER_MEDIA_COUNT}&type=movie`,
        topFilmsAndSeries: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}`,
    }
};
