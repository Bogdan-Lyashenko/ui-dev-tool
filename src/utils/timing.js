/**
 *
 * @type {{getAccurateTimeStamp: Function}}
 */
const Timing = {
    getAccurateTimeStamp() {
        return window.performance.now();
    }

};

export default Timing;