import Timing from "../../utils/timing.js";

/**
 *
 * @type {{execute: Function}}
 */
const TimingCalculator = {

    /**
     *
     * @param {Function} onIterationCb
     * @param {Function} stopConditionCb
     */
    execute (onIterationCb, stopConditionCb) {
        var delay = 100,
            start = Timing.getAccurateTimeStamp();

        setTimeout(() => {
            var end = Timing.getAccurateTimeStamp(),
                duration = end - start,
                failPercent = (duration - delay) / delay * 100;

            onIterationCb(end, failPercent);

            if (!stopConditionCb()) {
                this.execute(onIterationCb, stopConditionCb);
            }
        }, delay);
    }
};

export default TimingCalculator;