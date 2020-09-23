"use strict";

const utils = require("./utilities.js");

class Earnings {
  constructor(config) {
    this.endpoint = `/${utils.getAvailableEndpoints().earnings}`;
    this.apiKey = config.key;
  }

  getData(params) {
    const requestParams = {
      ...params,
      ...{
        apiKey: this.apiKey,
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

module.exports = Earnings;
