const ONE_SEC = 1000;

export default class Clock {
    /**
     *
     * @param {Object} view
     */
    constructor(view) {
        this.assignView(view);
    }

    /**
     *
     * @param {Object} view
     */
    assignView (view) {
        this.view = view;
    }

    start () {
        this.iterate();
    }

    stop () {
        clearInterval(this.intervalId);
    }

    iterate () {
        this.intervalId = setInterval(() => {
            this.updateView(this.getTime());
        }, ONE_SEC);
    }

    /**
     *
     * @returns {String}
     */
    getTime () {
        var now = (new Date);
        return now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    }

    /**
     *
     * @param {String} data
     */
    updateView (data) {
        if (!this.view) {
            throw new Error(`View is not defined. Use (new Clolk).assignView().`)
        }

        this.view.render(data);
    }
}

