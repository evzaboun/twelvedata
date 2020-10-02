"use strict";

const utils = require("./utilities.js");

class ApiUsage {
  constructor(config) {
    this.endpoint = utils.getAvailableEndpoints().api_usage;
    this.apikey = config.key;
  }

  getData() {
    const requestParams = {
        apikey: this.apikey,
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

module.exports = ApiUsage;
