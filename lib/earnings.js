"use strict";

const utils = require("./utilities.js");

class Earnings {
  constructor(config) {
    this.endpoint = utils.getAvailableEndpoints().earnings;
    this.apikey = config.key;
  }

  getData(params) {
    const requestParams = {
      ...params,
      ...{
        apikey: this.apiKey,
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

module.exports = Earnings;
