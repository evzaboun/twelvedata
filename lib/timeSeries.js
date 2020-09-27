"use strict";

const utils = require("./utilities.js");

class TimeSeries {
  constructor(config) {
    this.endpoint = `/${utils.getAvailableEndpoints().time_series}`;
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
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

module.exports = TimeSeries;
