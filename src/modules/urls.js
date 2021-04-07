// eslint-disable-next-line no-unused-vars
const localUrl = 'http://localhost:8081';

// eslint-disable-next-line no-unused-vars
const deployUrl = 'https://redioteka.com';

const NUMBER_OF_TOP_SLIDER_CONTENT = 5;
const NUMBER_OF_BOTTOM_SLIDER_CONTENT = 10;

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
        newSeries: `${currentUrl}/api/media/category/newSeries?limit=${NUMBER_OF_BOTTOM_SLIDER_CONTENT}&type=series`,
        newFilms: `${currentUrl}/api/media/category/newFilms?limit=${NUMBER_OF_BOTTOM_SLIDER_CONTENT}&type=movie`,
        topFilmsAndSeries: `${currentUrl}/api/media/category/top?limit=${NUMBER_OF_TOP_SLIDER_CONTENT}`,
    }
};
