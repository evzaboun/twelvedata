'use strict';

exports.getAvailableEndpoints = () => {
    return {
        earnings: "earnings",
        time_series: "time_series",
        complex_data: "complex_data",
        stocks: "stocks",
    };
};

exports.getDefaultBaseUrl = () => {
    return `https://api.twelvedata.com/`;
};
  