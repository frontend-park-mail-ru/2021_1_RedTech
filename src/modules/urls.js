const localUrl = 'http://localhost:8081';
const deployUrl = 'https://redioteka.com';
export const currentUrl = deployUrl;

export const URLS = {
    pages: {
        main: '/',
        profile: '/profile',
    },
    api: {
        me: `${deployUrl}/api/me`,
        media: `${deployUrl}/api/media/movie/1`,
        logout: `${deployUrl}/api/users/logout`,
        login: `${deployUrl}/api/users/login`,
        signup: `${deployUrl}/api/users/signup`,
        profile: `${deployUrl}/api/users/`,
    }
};
