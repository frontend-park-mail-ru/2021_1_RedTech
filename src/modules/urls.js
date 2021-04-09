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
        me: `${currentUrl}/api/me`,
        media: `${currentUrl}/api/media/movie/`,
        logout: `${currentUrl}/api/users/logout`,
        login: `${currentUrl}/api/users/login`,
        signup: `${currentUrl}/api/users/signup`,
        profile: `${currentUrl}/api/users/`,
        newSeries: `${currentUrl}/api/media/category/newSeries?limit=${BOTTOM_SLIDER_MEDIA_COUNT}&type=series`,
        newFilms: `${currentUrl}/api/media/category/newFilms?limit=${BOTTOM_SLIDER_MEDIA_COUNT}&type=movie`,
        topFilmsAndSeries: `${currentUrl}/api/media/category/top?limit=${TOP_SLIDER_MEDIA_COUNT}`,
    }
};
