import { getCurrentUser, getFilmStream } from '../modules/http.js';
import Events from '../consts/events.js';

/** Class representing video player model. */
export class VideoPlayerModel {
    /**
     * Create a video player model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.VideoPlayer.Init, this.initVideoPlayer);
    }

    initVideoPlayer = (data) => {
        let { isLoadedVideo, filmData, videoPlayer } = data;
        getCurrentUser().then((idUser) => {
            if (idUser) {
                if (!isLoadedVideo) {
                    getFilmStream(filmData.id).then((filmPath) => {
                        videoPlayer.setSrc(`${filmPath}`);
                        videoPlayer.visibleVideo();
                        isLoadedVideo = true;
                    });
                } else {
                    videoPlayer.visibleVideo();
                }
            } else {
                this.eventBus.emit(Events.PathChanged, { path: '/login' });
            }
        });
    }
}
