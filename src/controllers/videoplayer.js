import { eventBus } from '../modules/eventBus.js';
import Controller from './controller.js';
import { VideoPlayerModel } from '../models/videoplayer.js';

/** Class representing video player controller. */
export class VideoPlayerController extends Controller {
    constructor() {
        super(new Controller());
        this.eventBus = eventBus;
        this.model = new VideoPlayerModel(this.eventBus);
    }
}
