"use strict";

const utils = require("./utilities.js");

class Earnings {
  constructor(config) {
    this.endpoint = `/${utils.getAvailableEndpoints().earnings}`;
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
