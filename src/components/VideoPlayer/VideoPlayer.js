const VOLUME_ICONS = {
    full: '../../assets/VideoPlayerAssets/VolumeFull.png',
    half: '../../assets/VideoPlayerAssets/VolumeHalf.png',
    zero: '../../assets/VideoPlayerAssets/VolumeZero.png',
    none: '../../assets/VideoPlayerAssets/VolumeNot.png',
};

const PLAYSTOP_ICONS = {
    play: '../../assets/VideoPlayerAssets/ButtonPlay.png',
    stop: '../../assets/VideoPlayerAssets/ButtonStop.png',
};

const FULLSCREEN_ICONS = {
    fullscreen: '../../assets/VideoPlayerAssets/MakeFullScreen.png',
    partscreen: '.../../assets/VideoPlayerAssets/MakePartScreen.png',
};

export class VideoPlayer {
    constructor(selector, title) {
        this.videoPlayer = document.querySelector(selector);
        this.video = this.videoPlayer.querySelector('video');
        this.series = 0;
        this.season = 0;
        this.videoPlayer.querySelector('.js-title').innerHTML = title;
        this.previousVolume = 100;
        this.isVisible = false;
        this.isMoreThanOneHour =  this.video.duration > 600;
        if (!this.videoPlayer || !this.video) {
            throw new Error('VideoPlayer or Video is not defined');
        }

        this.initVideoPlayerListeners();
        this.initVideoListeners();
        this.initTimeLineListeners();
        this.initPageListeners();
    }

    changeVisability() {
        this.videoPlayer.style.visibility = this.isVisible ? 'hidden': 'visible';
        this.isVisible = !this.isVisible;
        this.isPlaying = !this.isPlaying;
        this.togglePlayStopButton();
        this.video[this.isVisible ? 'play': 'pause']();
    }

    initVideoListeners() {
        this.video.addEventListener('click', this.toggleVideo.bind(this));
        this.video.addEventListener('loadedmetadata', () => {
            this.setVideoDuration();
            this.setVideoVolume();
        });
        this.video.addEventListener('timeupdate', this.setVideoDuration.bind(this));
        this.video.addEventListener('dblclick', this.toggleFullScreen.bind(this));
        this.video.addEventListener('volumechange', this.setVideoVolume.bind(this));
    }

    initVideoPlayerListeners() {
        this.videoPlayer.addEventListener('fullscreenchange', this.checkFullScreen.bind(this));
        this.videoPlayer.querySelector('.js-close-video').addEventListener('click', this.hideVideo.bind(this));
        this.videoPlayer.querySelector('.js-toggle-video').addEventListener('click', this.toggleVideo.bind(this));
        this.videoPlayer.querySelector('.js-volume').addEventListener('input', this.setVolume.bind(this));
        this.videoPlayer.querySelector('.js-volume-image').addEventListener('click', this.toggleVolume.bind(this));
        this.videoPlayer.querySelector('.js-move-left').addEventListener('click', this.minusFifteen.bind(this));
        this.videoPlayer.querySelector('.js-move-right').addEventListener('click', this.plusFifteen.bind(this));
        this.videoPlayer.querySelector('.js-fullscreen').addEventListener('click', this.toggleFullScreen.bind(this));
        this.videoPlayer.querySelector('.js-prev-series').addEventListener('click', this.previousSeries.bind(this));
        this.videoPlayer.querySelector('.js-next-series').addEventListener('click', this.nextSeries.bind(this));
    }

    previousSeries() {
        if (typeof this.preaviousSeries !== 'undefined') {
            this.updateCurrentEpisode(this.preaviousSeries);
            this.resetPlaying(false);
        }
    }

    nextSeries() {
        if (typeof this.nextSeries !== 'undefined') {
            this.updateCurrentEpisode(this.nextSeries);
            this.resetPlaying(false);
        }
    }

    updateSwitchSeriesController() {
        const nextSeriesButton = this.videoPlayer.querySelector('.js-next-series');
        if (typeof this.nextSeries === 'undefined') {
            nextSeriesButton.style.display = 'none';
        } else {
            nextSeriesButton.style.display = '';
        }

        const prevSeriesButton = this.videoPlayer.querySelector('.js-prev-series');
        if (typeof this.preaviousSeries === 'undefined') {
            prevSeriesButton.style.display = 'none';
        } else {
            prevSeriesButton.style.display = '';
        }
    }

    initTimeLineListeners() {
        const line = this.videoPlayer.querySelector('.js-line');
        line.addEventListener('mousemove', this.calcHintLines.bind(this));
        line.addEventListener('click', (event) => {
            const {left} = event.target.getBoundingClientRect();
            this.video.currentTime = this.calcNeededLine(event, left);
        });
    }

    initPageListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowRight') {
                this.plusFifteen();
            } else if (event.code === 'ArrowLeft') {
                this.minusFifteen();
            } else if (event.code === 'ArrowUp') {
                if (this.video.volume + 0.1 >= 1 ) {
                    this.video.volume = 1;
                } else {
                    this.video.volume += 0.1;
                }
            } else if (event.code === 'ArrowDown') {
                if (this.video.volume - 0.1 <= 0) {
                    this.video.volume = 0;
                } else {
                    this.video.volume -= 0.1;
                }
            }
        });
    }

    setSrc(newSrc) {
        this.video.src = `${newSrc}`;
    }

    setFilmDataTransition(season, series, filmPath) {
        this.filmPath = filmPath;
        const serialControls = this.videoPlayer.querySelector('.serial-switcher-js');
        const filmControls = this.videoPlayer.querySelector('.film-switcher-js');

        if (filmPath.length == 1) {
            serialControls.style.display = 'none';
            filmControls.style.visibility = 'visible';
            this.setEpisodes();
        } else {
            serialControls.style.visibility = 'visible';
            filmControls.style.display = 'none';

            const episode = {
                season,
                series,
            };

            this.updateCurrentEpisode(episode);
        }
    }

    updateCurrentEpisode(episode) {
        this.filmPath.forEach((item, index, array) => {
            if (item.season == episode.season && item.series == episode.series) {
                this.setSrc(item.video_path);

                if (index - 1 < 0) {
                    this.preaviousSeries = undefined;
                } else {
                    this.preaviousSeries = array[index - 1];
                }

                if (index + 1 >= array.length) {
                    this.nextSeries = undefined;
                } else {
                    this.nextSeries = array[index + 1];
                }

                this.setEpisodes(episode);
                this.updateSwitchSeriesController();
            }
        });
    }

    setEpisodes(episode) {
        if (typeof episode === 'undefined') {
            this.videoPlayer.querySelector('.js-series-info').innerHTML = '';
            return;
        }

        this.season = episode.season;
        this.series = episode.series;
        this.videoPlayer.querySelector('.js-series-info').innerHTML = `сезон: ${episode.season}, серия: ${episode.series}`;
    }

    hideVideo() {
        window.scrollTo(0, 0);
        document.body.className = document.body.className.replace('stop-scrolling','');
        const fullscreenImg = this.videoPlayer.querySelector('.js-fullscreen-img');
        if (document.fullscreenElement) {
            fullscreenImg.src = FULLSCREEN_ICONS.fullscreen;
            document.exitFullscreen();
        }
        this.isPlaying = true;
        this.videoPlayer.classList.remove('video-player__show-animation');
        this.videoPlayer.classList.add('video-player__hide-animation');
        this.toggleVideo();
    }

    resetPlaying(isPlaying = false) {
        this.isPlaying = isPlaying;
        this.togglePlayStopButton();
        this.video[this.isPlaying ? 'play': 'pause']();
    }

    visibleVideo() {
        window.scrollTo(0, 0);
        document.body.classList.add('stop-scrolling');
        this.videoPlayer.classList.remove('video-player__hide-animation');
        this.videoPlayer.classList.add('video-player__show-animation');
        this.resetPlaying(true);
    }

    minusFifteen() {
        this.video.currentTime -= 15;
        this.togglePlayStopButton();
    }

    plusFifteen() {
        if (this.video.duration < this.video.currentTime + 15) {
            this.isPlaying = false;
        }
        this.video.currentTime += 15;
        this.togglePlayStopButton();
    }

    setVolume( { target } ) {
        this.video.volume = target.value / 100;
    }

    toggleVideo() {
        this.isPlaying = !this.isPlaying;

        this.togglePlayStopButton();

        this.video[this.isPlaying ? 'play': 'pause']();
    }

    togglePlayStopButton() {
        const icon = this.videoPlayer.querySelector('.js-toggle-video');
        const img = icon.querySelector('.js-play-button');
        img.src = this.isPlaying ? PLAYSTOP_ICONS.stop: PLAYSTOP_ICONS.play;
    }

    toggleVolume() {
        this.isAudible = !this.isAudible;

        if (this.isAudible) {
            const volumeImg = this.videoPlayer.querySelector('.js-volume-image');
            const currentVolume = this.videoPlayer.querySelector('.js-volume');

            volumeImg.src = VOLUME_ICONS.none;
            currentVolume.value = 0;
            this.previousVolume = this.video.volume;
            this.video.volume = 0;
        } else {
            const currentVolume = this.videoPlayer.querySelector('.js-volume');

            this.setVideoVolume();
            currentVolume.value = this.previousVolume / 100;
            this.video.volume = this.previousVolume;
        }
    }

    toggleFullScreen() {
        const fullscreenImg = this.videoPlayer.querySelector('.js-fullscreen-img');
        if (document.fullscreenElement) {
            fullscreenImg.src = FULLSCREEN_ICONS.fullscreen;
            document.exitFullscreen();
        } else {
            fullscreenImg.src = FULLSCREEN_ICONS.partscreen;
            this.videoPlayer.requestFullscreen();
        }
    }

    checkFullScreen() {
        const isFullscreen = Boolean(document.fullscreenElement);

        this.videoPlayer.classList.toggle('video-player__fullscreen', isFullscreen);
    }

    fixNumber(number) {
        return number < 10 ? `0${number}` : `${number}`;
    }

    formatTime(seconds) {
        if (this.isMoreThanOneHour) {
            return `${Math.floor(seconds / 60)}:${this.fixNumber(Math.floor(seconds % 60))}`;
        } else {
            return `${Math.floor(seconds / 60)}:${this.fixNumber(Math.floor(seconds % 60))}`;
        }
    }

    setVideoDuration() {
        const duration = Number(this.video.duration.toFixed());
        const current =  Number(this.video.currentTime.toFixed());
        const formattedDuration = `${this.formatTime(current)} / ${this.formatTime(duration)}`;
        const htmlDuration = this.videoPlayer.querySelector('.js-duration');
        const spinner = this.videoPlayer.querySelector('.spinner');
        spinner.style.visibility = 'hidden';

        this.videoPlayer.querySelector('.video-player__line-current').style.width = `${(current / duration) * 100}%`;

        if (htmlDuration.innerHTML !== formattedDuration) {
            this.videoPlayer.querySelector('.js-duration').innerHTML = `${this.formatTime(current)} / ${this.formatTime(duration)}`;
        }

        if (current === duration) {
            this.isPlaying = false;
            this.togglePlayStopButton();
        }
    }

    setVideoVolume() {
        this.videoPlayer.querySelector('.js-volume').value = this.video.volume * 100;
        let volumeImg = this.videoPlayer.querySelector('.js-volume-image');

        if (this.video.volume > 0.66) {
            volumeImg.src = VOLUME_ICONS.full;
        } else if (this.video.volume > 0.33) {
            volumeImg.src = VOLUME_ICONS.half;
        } else if (this.video.volume > 0) {
            volumeImg.src = VOLUME_ICONS.zero;
        }
    }

    calcNeededLine(event, left) {
        const needPercent = ((event.clientX - left) / event.target.offsetWidth);

        return this.video.duration * needPercent;
    }

    calcHintLines(event) {
        const {left} = event.target.getBoundingClientRect();
        const hint = this.videoPlayer.querySelector('.js-hint');

        hint.innerHTML = this.formatTime(this.calcNeededLine(event, left));
        hint.style.left = `${event.clientX - (left + (hint.offsetWidth / 2))}px`;
    }
}
