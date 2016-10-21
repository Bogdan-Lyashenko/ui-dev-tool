import Helper from "./helpers.js";

export default class EventEmitter {
    constructor() {
        this.id = Helper.generateUniqueString();
        this.eventListeners_ = {};
    }

    /**
     * callback register
     * @param {string} name
     * @param {function} callback
     */
    on (name, callback) {
        if (!Array.isArray(this.eventListeners_[name])) {
            this.eventListeners_[name] = [];
        }

        this.eventListeners_[name].push(callback);
    }

    /**
     *
     * @param {String} name
     * @param {Object} event
     */
    emit (name, event) {
        _.each(this.eventListeners_[name], (callback) => {
            callback && callback(event);
        });
    }

    /**
     *
     * @returns {Object}
     */
    getEventListeners () {
        return this.eventListeners_;
    }
}

