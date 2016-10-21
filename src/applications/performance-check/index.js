import Process from "./process.js";
import Helpers from "../../utils/helpers.js";

export default class PerformanceCheck {
    constructor() {
        this.processes = {};
    }

    /**
     *
     * @param {String} id
     * @returns {Object}
     */
    getProcess(id) {
        if (!Helpers.isString(id)) {
            throw new Error(`Invalid id ${id}. ID should be in String format.`);
        }

        if (this.processes[id]) {
            return this.processes[id];
        }
    }

    /**
     *
     * @returns {Object}
     */
    createProcess(id = Helpers.generateUniqueString()) {
        if (this.getProcess(id)) {
            throw new Error(`Process with id ${id} already exist. Kill it before.`);
        }

        let process = new Process(id);
        this.processes[id] = process;

        return process;
    }

    killProcess(id) {
        let process = this.getProcess(id);

        if (!process) {
            throw new Error(`Can not find process #id ${id}.`);
        }

        process.stop();
        delete this.processes[id];
    }

    start(id) {
        let process = this.getProcess(id);

        if (!process) {
            throw new Error(`Can not find process #id ${id}.`);
        }

        process.start();
    }

    stop(id) {
        let process = this.getProcess(id);

        if (!process) {
            throw new Error(`Can not find process #id ${id}.`);
        }

        process.stop();
    }
}