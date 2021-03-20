const localUrl = 'http://localhost:8081';
const deployUrl = 'https://redioteka';
export const currentUrl = deployUrl;

export const URLS = {
    pages: {
        main: '/',
        profile: '/profile',
    },
    api: {
        me: `${localUrl}/api/me`,
        media: `${localUrl}/api/media/movie/1`,
        logout: `${localUrl}/api/users/logout`,
        login: `${localUrl}/api/users/login`,
        signup: `${localUrl}/api/users/signup`,
        profile: `${localUrl}/api/users/`,
    }
};
