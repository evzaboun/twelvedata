'use strict';

class TimeSeries {
    constructor(config) {
        // move that to a util function
        config = {
            ...config,
            ...{
              base:
                `${config.base}${config.availableEndpoints.time_series}?apikey=${config.key}&`,
            },
          };
    }

    getData() {

    }
}

export { TimeSeries };