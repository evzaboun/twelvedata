"use strict";

const utils = require("./utilities.js");

class TimeSeries {
  constructor(config) {
    this.endpoint = utils.getAvailableEndpoints().time_series;
    this.apikey = config.key;
  }

  getData(params) {
    const requestParams = {
      ...params,
      ...{
        apikey: this.apikey,
      },
    };

    return utils
      .fetchData(this.endpoint, requestParams)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = TimeSeries;
