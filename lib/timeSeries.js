"use strict";
const axios = require("./axios.js");

class TimeSeries {
  constructor(config) {
    this.apiKey = config.key;
    // move that to a util function
    // config = {
    //   ...config,
    //   ...{
    //     base: `${config.base}${config.availableEndpoints.time_series}?apikey=${config.key}&`,
    //   },
    //};
  }

  getData() {}
}

module.exports = TimeSeries;
