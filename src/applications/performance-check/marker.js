import Timing from "../../utils/timing.js";

export default class Marker {
    constructor({value, time, type}) {
        this.value = value;
        this.time = time || Timing.getAccurateTimeStamp();
        this.type = type;
    }
}
