import Logger from "../applications/logger/index.js"

export default class BasicModule {
    constructor() {
        Logger.info(`Module ${this.name} init.`);
    }
}