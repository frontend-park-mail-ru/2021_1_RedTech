import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import { getPathArgs } from '../../modules/router.js';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer.js';
import { getFilmStream } from '../../modules/http.js';
import { currentUrl } from '../../consts/urls.js';

import Loader from '../../components/Loader/Loader.pug';
import DetailForm from '../../components/DetailForm/DetailForm.pug';

/** Class representing film detail page view. */
export class DetailPageView extends BaseView {
    /**
     * Create a home page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object} - Parameters for film detail page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on('detailpage:render', this.render);
        this.eventBus.on('detailpage:renderDetailsAboutFilm', this.renderDetailsAboutFilm);
        this.eventBus.on('detailpage:setEventListeners', this.setEventListeners);
        this.eventBus.on('detailpage:changeIconOfFav', this.changeIconOfFav);
    }
    /**
     * Render html film detail page from pug template.
     */
    render = () => {
        const template = Loader();
        APPLICATION.innerHTML = template;

        let pathArgs = getPathArgs(window.location.pathname, '/movie/:id');

        this.eventBus.emit('detailpage:getInfoAboutFilm', pathArgs.id);
        this.eventBus.emit('homepage:InfoForHeader');
    }

    /**
     * Render html film detail page from pug template into content div.
     * @param {Object} filmData - Detail info about film in object.
     */
    renderDetailsAboutFilm = (filmData) => {
        this._data = { filmData };
        const template = DetailForm(this._data);
        const content = document.querySelector('.content');
        if (content) {

            content.innerHTML = template;

            const videoPlayer = new VideoPlayer('.video-player');

            let isLoadedVideo = false;
            const openPlayerHandler = (event) => {
                event.preventDefault();

                if (!isLoadedVideo) {
                    getFilmStream('1').then((filmPath) => {
                        // console.log(`${currentUrl}${filmPath}`);
                        // console.log(`${currentUrl}${filmPath.video_path}`);

                        // videoPlayer.setSrc(`${currentUrl}${filmPath}`);
                        videoPlayer.setSrc(`${filmPath}`);
                        videoPlayer.visibleVideo();
                        isLoadedVideo = true;
                    });
                } else {
                    videoPlayer.visibleVideo();
                }
            };

            const closeOpenVideo = document.querySelector('.js-play-detail');
            closeOpenVideo.addEventListener(('click'), openPlayerHandler);
        } else {
            this.eventBus.emit('homepage:renderErrorPage');
        }
    }

    /**
     * Change icon of add/remove to/from favourites.
     */
    changeIconOfFav = () => {
        const addToFav = document.querySelector('.js-add-favourite-detail');
        const removeFromFav = document.querySelector('.js-remove-favourite-detail');

        addToFav.hidden = !addToFav.hidden;
        removeFromFav.hidden = !removeFromFav.hidden;
    }

    /**
     * Set event listeners.
     */
    setEventListeners = () => {
        const contentImage = document.querySelector('.js-preview-image');

        const imageErrorHandler = () => {
            contentImage.src = 'img/not-found.jpeg';
        };

        const addToFavourites = (event) => {
            event.preventDefault();
            const contentId = document.querySelector('.detail_preview').id;
            this.eventBus.emit('detailpage:addToFavourites', contentId);
        };

        const removeFromFavourites = (event) => {
            event.preventDefault();
            const contentId = document.querySelector('.detail_preview').id;
            this.eventBus.emit('detailpage:removeFromFavourites', contentId);
        };

        const addToFav = document.getElementById('add_to_fav');
        addToFav.addEventListener('click', addToFavourites);

        const removeFromFav = document.getElementById('remove_from_fav');
        removeFromFav.addEventListener('click', removeFromFavourites);

        contentImage.addEventListener('error', imageErrorHandler);

        const removeEventListeners = () => {
            contentImage.removeEventListener('error', imageErrorHandler);
            addToFav.removeEventListener('click', addToFavourites);
            removeFromFav.removeEventListener('click', removeFromFavourites);
        };

        this.eventBus.on('detailpage:removeEventListeners', removeEventListeners);
    }
}
