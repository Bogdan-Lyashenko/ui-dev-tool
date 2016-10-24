import Helpers from "../../utils/helpers.js";

const LogLevelMap = {
    ERROR: {
        code: 0,
        consoleFnName: 'error'
    },
    WARNING: {
        code: 1,
        consoleFnName: 'warn'
    },
    INFO: {
        code: 2,
        consoleFnName: 'info'
    },
    DEBUG: {
        code: 3,
        consoleFnName: 'debug'
    }
};

const DEFAULT_MAX_BUFFER_LENGTH = 100;

export default class Logger {
    /**
     *
     * @returns {Object}
     */
    constructor() {
        this.messageBuffer_ = [];
        this.logSources = [];
        this.currentLogLevelCode = LogLevelMap.DEBUG.code;

        this.setupMessageBufferFiller();
    }

    error () {
        return this.log(LogLevelMap.ERROR, arguments);
    }

    warn () {
        return this.log(LogLevelMap.WARNING, arguments);
    }

    info () {
        return this.log(LogLevelMap.INFO, arguments);
    }

    debug () {
        return this.log(LogLevelMap.DEBUG, arguments);
    }

    /**
     *
     * @returns {{start: string, end: string}}
     */
    getPairedLogMarkers () {
        var id = Helpers.generateUniqueString();

        return {
            start: ' (start *'+ id + '* )',
            end: ' (end *'+ id + '* )'
        };
    }

    /**
     * Message buffer fill implementation
     * @private
     */
    setupMessageBufferFiller () {
        this.addSource((content, logLevel) => {
            this.messageBuffer.push({
                content: content,
                logLevel: logLevel
            });

            if (this.messageBuffer.length > DEFAULT_MAX_BUFFER_LENGTH) {
                this.messageBuffer = this.messageBuffer.slice(-DEFAULT_MAX_BUFFER_LENGTH);
            }
        });
    }

    /**
     * Adds console as a logger source
     */
    setupBrowserConsole () {
        this.addSource((content, logLevel) => {
            window.console[logLevel.consoleFnName].call(window.console, content.message);
        });
    }

    /**
     * @param {Object} logLevel
     */
    setLogLevel (logLevel) {
        this.currentLogLevelCode = logLevel.code;
    }

    /**
     *
     * @param {Function} sourceFn
     */
    addSource (sourceFn) {
        if (!Helpers.isFunction(sourceFn)) {
            throw new Error('Invalid logger source');
        }

        this.logSources.push(function (prefix, args) {
            sourceFn(args, prefix.logLevel, prefix.timeStr);
        });

        this.messageBuffer.forEach(function (item) {
            sourceFn(item.content, item.logLevel, item.timeStr);
        });
    }

    /**
     * @param {Object} logLevel
     * @param {Array} args
     * @private
     */
    log (logLevel, args) {
        let now, prefix;

        if (logLevel.code > this.currentLogLevelCode) {
            return;
        }

        now = new Date();
        prefix = {
            timeStr: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
            logLevel: logLevel
        };

        this.logSources.forEach(function(item) {
            item(prefix, args);
        });
    }
}