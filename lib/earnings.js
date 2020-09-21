"use strict";

const utils = require("./utilities.js");
class Earnings {
  constructor(config) {
    this.endpoint = `${utils.getDefaultBaseUrl()}${utils.getAvailableEndpoints().earnings}?apikey=${config.key}&`;  
  }

  getData() {}
}

module.exports = Earnings;
