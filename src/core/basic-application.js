import Logger from "../applications/logger/index.js"

export default class BasicApplication {
    constructor() {
        Logger.info(`Application ${this.name} init.`);
    }
}