import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

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
        const template = puglatizer.components.Loader.Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit('detailpage:getInfoAboutFilm');
        this.eventBus.emit('homepage:InfoForHeader');
    }

    /**
     * Render html film detail page from pug template into content div.
     * @param {Object} filmData - Detail info about film in object.
     */
    renderDetailsAboutFilm = (filmData) => {
        this._data = { filmData };
        const template = puglatizer.components.DetailForm.DetailForm(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit('homepage:renderErrorPage');
        }
    }

    /**
     * Change icon of add/remove to/from favourites.
     */
    changeIconOfFav = () => {
        const favIcon = document.querySelector('.item__favourite-icon');
        if (favIcon.id === 'add_to_fav') {
            favIcon.src = '../../assets/favourite.png';
            favIcon.id = 'remove_from_fav';
            this.eventBus.emit('detailpage:removeEventFromAddToFav');

            const removeFromFavourites = (event) => {
                event.preventDefault();
                const contentId = document.querySelector('.detail_preview').id;
                this.eventBus.emit('detailpage:removeFromFavourites', contentId);
            };

            favIcon.addEventListener('click', removeFromFavourites);

            const removeEventFromRemoveFromFav = () => {
                favIcon.removeEventListener('submit', removeFromFavourites);
            };
            this.eventBus.emit('detailpage:removeEventFromAddToFav');
            this.eventBus.on('detailpage:removeEventFromRemoveFromFav', removeEventFromRemoveFromFav);

        } else {
            favIcon.src = '../../assets/star.png';
            favIcon.id = 'add_to_fav';

            this.eventBus.emit('detailpage:removeEventFromRemoveFromFav');

            const addToFavourites = (event) => {
                event.preventDefault();
                const contentId = document.querySelector('.detail_preview').id;
                this.eventBus.emit('detailpage:addToFavourites', contentId);
            };

            favIcon.addEventListener('click', addToFavourites);
        }
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

        const addToFav = document.getElementById('add_to_fav');
        addToFav.addEventListener('click', addToFavourites);

        contentImage.addEventListener('error', imageErrorHandler);

        const removeEventListeners = () => {
            contentImage.removeEventListener('error', imageErrorHandler);
            addToFav.removeEventListener('click', addToFavourites);
        };

        const removeEventFromAddToFav = () => {
            addToFav.removeEventListener('click', addToFavourites);
        };

        this.eventBus.on('detailpage:removeEventFromAddToFav', removeEventFromAddToFav);
        this.eventBus.on('detailpage:removeEventListeners', removeEventListeners);
    }
}
