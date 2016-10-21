import Helpers from "../../utils/helpers.js";
import TimingCalculator from "./timing-calculator.js";
import ResultsBuilder from "./results-builder.js";
import Marker from "./marker.js";

export default class Process {
    /**
     *
     * @param {String} id
     */
    constructor(id) {
        this.id = id;

        this.setPerformanceCalculator(TimingCalculator);
        this.setResultsBuilder(ResultsBuilder);
        this.initAppStates();
    }

    initAppStates () {
        this.states = {
            working: {
                execute: () => {
                    this.results = {};
                    this.pointsList = [];
                    this.isStopped = false;
                    this.startComputePerformanceStatistics();
                }
            },

            stopping: {
                execute: () => {
                    this.isStopped = true;
                }
            },

            pausing: {
                execute: () => {
                    this.isStopped = true;
                }
            },

            resuming: {
                execute: () => {
                    this.isStopped = false;
                    this.startComputePerformanceStatistics();
                }
            }
        };
    }

    start() {
        this.changeState(this.states.working);
    }

    stop () {
        this.changeState(this.states.stopping);
    }

    pause () {
        this.changeState(this.states.pausing);
    }

    resume () {
        this.changeState(this.states.resuming);
    }

    /**
     *
     * @param state
     */
    changeState(state) {
        this.currentState = state;
        this.currentState.execute();
    }

    addMarker() {
        let lastPoint = this.pointsList[this.pointsList.length - 1],
            markerConfig = {
                value: lastPoint.value
            };

        this.addPointToList(new Marker(markerConfig));
    }

    startComputePerformanceStatistics() {
        let onIterationCb = (time, failPercent) => {
            this.addPointToList({time, value: failPercent});
        };

        let stopConditionCb = () => this.isStopped;

        this.performanceCalculator.execute(onIterationCb, stopConditionCb);
    }

    addPointToList(point) {
        this.pointsList.push(point);
    }

    /**
     * 
     * @param {Object} performanceCalculator
     */
    setPerformanceCalculator(performanceCalculator) {
        this.performanceCalculator = performanceCalculator;
    }

    /**
     *
     * @param {Object} ResultsBuilder
     */
    setResultsBuilder(ResultsBuilder) {
        this.resultsBuilder = ResultsBuilder;
    }

    /**
     *
     * @returns {Object}
     */
    getResults () {
        if (!this.results) {
            this.results = this.resultsBuilder.execute();
        }

        return this.results;
    }
}