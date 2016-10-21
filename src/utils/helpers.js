const Helpers = {
    /**
     *
     * @param {Number=} length
     * @returns {string}
     */
    generateUniqueString(length = 30) {
        let str = '';

        for (let i=0; i < Math.ceil(length/5); i++) {
            str += Math.floor((1 + Math.random()) * 0x10000).toString(16);
        }

        return str.substr(0, length);
    },

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    isFunction(value) {
        return typeof value === 'function';
    },

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    isString(value) {
        return typeof value === 'string';
    },

    getTimeStamp() {
        return window.performance.now();
    }

};

export default Helpers;