import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import { getPathArgs } from '../../modules/router.js';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer.js';

import Loader from '../../components/Loader/Loader.pug';
import DetailForm from '../../components/DetailForm/DetailForm.pug';
import { Events } from '../../consts/events.js';

/** Class representing film detail page view. */
export class DetailPageView extends BaseView {
    /**
     * Create a home page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object} - Parameters for film detail page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.DetailPage.Render.Page, this.render);
        this.eventBus.on(Events.DetailPage.Render.VideoPlayer, this.renderVideoPlayer);
        this.eventBus.on(Events.DetailPage.Render.DetailsAboutFilm, this.renderDetailsAboutFilm);
        this.eventBus.on(Events.DetailPage.SetEventListeners, this.setEventListeners);
        this.eventBus.on(Events.DetailPage.Change.IconOfFav, this.changeIconOfFav);
        this.eventBus.on(Events.DetailPage.Change.IconOfLike, this.changeIconOfLike);
    }
    /**
     * Render html film detail page from pug template.
     */
    render = () => {
        const template = Loader();
        APPLICATION.innerHTML = template;

        let pathArgs = getPathArgs(window.location.pathname, '/movie/:id');

        this.eventBus.emit(Events.DetailPage.GetInfoAboutMovie, pathArgs.id);
        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
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
            this.eventBus.emit(Events.DetailPage.Render.VideoPlayer, filmData, 0, 0);
        } else {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
    }

    /**
     * Render video player.
     * @param {Object} filmData - Detail info about film in object.
     * @param {Number} season - Number of season, in case of movie will be 0.
     * @param {Number} series - Number of series, in case of movie will be 0.
     */
    renderVideoPlayer = (filmData, season, series) => {
        const videoPlayer = new VideoPlayer('.video-player', filmData.title);
        const isLoadedVideo = false;
        this._data = {
            isLoadedVideo,
            filmData,
            videoPlayer,
            season: season,
            series: series,
        };
        const openPlayerHandler = (event) => {
            event.preventDefault();
            this.eventBus.emit(Events.VideoPlayer.Init, this._data);
        };

        const closeOpenVideo = document.querySelector('.js-play-detail');
        closeOpenVideo.addEventListener(('click'), openPlayerHandler);
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
     * Change icon of like/dislike.
     */
    changeIconOfLike = (data) => {
        const like = document.querySelector('.js-like-detail');
        const dislike = document.querySelector('.js-dislike-detail');

        const pressedLike = document.querySelector('.js-pressed-like-detail');
        const pressedDislike = document.querySelector('.js-pressed-dislike-detail');

        if (data.isLike) {
            pressedLike.hidden = false;
            like.hidden = true;
            pressedDislike.hidden = true;
            dislike.hidden = false;
        } else {
            pressedLike.hidden = true;
            like.hidden = false;
            pressedDislike.hidden = false;
            dislike.hidden = true;
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
            this.eventBus.emit(Events.Content.AddToFavourites, contentId);
        };

        const removeFromFavourites = (event) => {
            event.preventDefault();
            const contentId = document.querySelector('.detail_preview').id;
            this.eventBus.emit(Events.Content.RemoveFromFavourites, contentId);
        };

        const like = (event) => {
            event.preventDefault();
            const contentId = document.querySelector('.detail_preview').id;
            this.eventBus.emit(Events.Content.Like, contentId);
        };

        const dislike = (event) => {
            event.preventDefault();
            const contentId = document.querySelector('.detail_preview').id;
            this.eventBus.emit(Events.Content.Dislike, contentId);
        };

        const seriesHandler = (event) => {
            const target = event.target.closest('.series__info');
            event.preventDefault();

            if (target) {
                const series = document.querySelectorAll('.series__info');
                series.forEach((serie) => {
                    serie.classList.remove('series__chosen') ;
                });
                target.classList.add('series__chosen');
                this._data.season = target.dataset.season;
                this._data.series = target.dataset.series;
                this.eventBus.emit(Events.VideoPlayer.Init, this._data);
            }
        };

        const seriesContainer = document.querySelectorAll('.detail_description__series');
        seriesContainer.forEach((container) => {
            container.addEventListener(('click'), seriesHandler);
        });

        const addToFav = document.getElementById('add_to_fav');
        addToFav.addEventListener('click', addToFavourites);

        const removeFromFav = document.getElementById('remove_from_fav');
        removeFromFav.addEventListener('click', removeFromFavourites);

        const likeElem = document.getElementById('like');
        likeElem.addEventListener('click', like);

        const dislikeElem = document.getElementById('dislike');
        dislikeElem.addEventListener('click', dislike);

        contentImage.addEventListener('error', imageErrorHandler);
    }
}
