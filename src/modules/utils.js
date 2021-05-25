export const scrollToTop = () => window.scrollTo(0, 0);

export const insertSpaceAfterComa = (value) => value.toString().replace(/,/g, ', ');

export const numToFixTruth = (value) => parseFloat(value).toFixed(2);

export const getCSRFToken = () => {
    const token = document.cookie.match(/csrf_token=([\w-]+)/);
    return token ? token[1] : null;
};
