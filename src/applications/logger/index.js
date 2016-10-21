import Helpers from "../../utils/helpers.js";

const LogLevelMap = {
    ERROR: {
        code: 0,
        consoleFnName: 'error',
        shortcut: 'ERROR'
    },
    WARNING: {
        code: 1,
        consoleFnName: 'warn',
        shortcut: 'WARNING'
    },
    INFO: {
        code: 2,
        consoleFnName: 'info',
        shortcut: 'INFO'
    },
    DEBUG: {
        code: 3,
        consoleFnName: 'debug',
        shortcut: 'DEBUG'
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
        this.logSources_ = [];
        this.currentLogLevelCode_ = LogLevelMap.DEBUG.code;

        this.setupMessageBufferFiller_();
    }

    error () {
        return this.log_(LogLevelMap.ERROR, arguments);
    }

    warn () {
        return this.log_(LogLevelMap.WARNING, arguments);
    }

    info () {
        return this.log_(LogLevelMap.INFO, arguments);
    }

    debug () {
        return this.log_(LogLevelMap.DEBUG, arguments);
    }

    /**
     * Message buffer fill implementation
     * @private
     */
    setupMessageBufferFiller_ () {
        this.addSource((content, logLevel) => {
            this.messageBuffer_.push({
                content: content,
                logLevel: logLevel
            });

            if (this.messageBuffer_.length > DEFAULT_MAX_BUFFER_LENGTH) {
                this.messageBuffer_ = this.messageBuffer_.slice(-DEFAULT_MAX_BUFFER_LENGTH);
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
        this.currentLogLevelCode_ = logLevel.code;
    }

    /**
     *
     * @param {Function} sourceFn
     */
    addSource (sourceFn) {
        if (!_.isFunction(sourceFn)) {
            throw new Error('Invalid logger source');
        }

        this.logSources_.push(function (prefix, args) {
            sourceFn(content, prefix.logLevel, prefix.timeStr);
        });

        _.each(this.messageBuffer_, function (item) {
            sourceFn(item.content, item.logLevel, item.timeStr);
        });
    }

    /**
     * @param {Object} logLevel
     * @param {Array} args
     * @private
     */
    log_ (logLevel, args) {
        let now, prefix;

        if (logLevel.code > this.currentLogLevelCode_) {
            return;
        }

        now = new Date();
        prefix = {
            timeStr: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
            logLevel: logLevel
        };

        _.each(this.logSources_, function(item) {
            item(prefix, args);
        });
    }
}