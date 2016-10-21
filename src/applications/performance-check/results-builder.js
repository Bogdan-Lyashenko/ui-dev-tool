/**
 *
 * @type {{execute: Function}}
 */
const ResultsBuilder = {

    /**
     *
     * @param {Array} pointsList
     * @returns {Object}
     */
    execute (pointsList) {
        var valuesList = pointsList.map(((item)=> item[1])),
            sum = valuesList.reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            });

        return {
            iterationsNumber: valuesList.length,
            iterationPerformance: sum / valuesList.length,
            pointsList: pointsList
        };
    }
};

export default ResultsBuilder;