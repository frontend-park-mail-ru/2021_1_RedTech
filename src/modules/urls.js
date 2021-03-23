// eslint-disable-next-line no-unused-vars
const localUrl = 'http://localhost:8081';
// eslint-disable-next-line no-unused-vars
const deployUrl = 'https://redioteka.com';
export const currentUrl = localUrl;

export const URLS = {
    pages: {
        main: '/',
        profile: '/profile',
    },
    api: {
        me: `${currentUrl}/api/me`,
        media: `${currentUrl}/api/media/movie/1`,
        logout: `${currentUrl}/api/users/logout`,
        login: `${currentUrl}/api/users/login`,
        signup: `${currentUrl}/api/users/signup`,
        profile: `${currentUrl}/api/users/`,
    }
};
