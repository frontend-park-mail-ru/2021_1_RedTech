const localUrl = 'http://localhost:8081';
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
        logout: `${currentUrl}/api/logout`,
        login: `${currentUrl}/api/users/login`,
        signup: `${currentUrl}/api/users/signup`,
        profile: `${currentUrl}/api/users/`,
    }
};
