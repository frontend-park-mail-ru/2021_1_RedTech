import { getCurrentUser, getFilmStream } from '../modules/http.js';
import Events from '../consts/events.js';
import Routes from '../consts/routes.js';

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
                        if (data.season >= 1) {
                            videoPlayer.setSrc(`${filmPath[filmData.seriesList[data.season-1]+data.series].video_path}`);
                        } {
                            videoPlayer.setSrc(`${filmPath[data.series].video_path}`);
                        }

                        videoPlayer.visibleVideo();
                        isLoadedVideo = true;
                    });
                    return;
                }
                videoPlayer.visibleVideo();
                return;
            }
            this.eventBus.emit(Events.PathChanged, { path: Routes.LoginPage });
        });
    }
}
