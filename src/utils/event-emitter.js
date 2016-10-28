import Helper from "./helpers.js";

export default class EventEmitter {
    constructor() {
        this.id = Helper.generateUniqueString();
        this.eventListeners = {};
    }

    /**
     * callback register
     * @param {string} name
     * @param {function} callback
     */
    on (name, callback) {
        if (!Array.isArray(this.eventListeners[name])) {
            this.eventListeners[name] = [];
        }

        this.eventListeners[name].push(callback);
    }

    /**
     *
     * @param {String} name
     * @param {Object} event
     */
    emit (name, event) {
        eventListeners.forEach([name], (callback) => {
            callback && callback(event);
        });
    }

    /**
     *
     * @returns {Object}
     */
    getEventListeners () {
        return this.eventListeners;
    }
}

