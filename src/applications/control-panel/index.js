import Helpers from "../../utils/helpers.js";
import Clock from "./clock.js";
import EventEmitter from "../../utils/event-emitter.js";


const EventsMap = {
    START: 'start',
    STOP: 'stop',
    PAUSE: 'pause',
    RESUME: 'resume'
};


export default class ControlPanel {
    constructor() {
        this.clock = new Clock();

        this.eventEmitter = new EventEmitter();
		
		this.initDomEventListeners();
    }

    initDomEventListeners() {
        
    }

    /**
     *
     * @param {String} eventName
     * @param {Function} cb
     */
    on (eventName, cb) {
        this.eventEmitter.on(eventName, cb);
    }
}