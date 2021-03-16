const localUrl = 'http://localhost:8081';
const deployUrl = 'https://redioteka';
export let currentUrl = localUrl;

export const URLS = {
    pages: {
        main: '/',
        profile: '/profile',
    },
    api: {
        me: `${localUrl}/api/me`,
        media: `${localUrl}/api/media/movie/1`,
        logout: `${localUrl}/api/logout`,
        login: `${localUrl}/api/users/login`,
        signup: `${localUrl}/api/users/signup`,
        profile: `${localUrl}/api/users/`,
    }
};

