"use strict";
const axios = require("./axios.js");
const utils = require("./utilities.js");

class TimeSeries {
  constructor(config) {
    this.endpoint = `${utils.getDefaultBaseUrl()}${utils.getAvailableEndpoints().time_series}?apikey=${config.key}&`;  
  }

  getData() {}
}

module.exports = TimeSeries;
