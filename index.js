"use strict";

const utils = require("./lib/utilities.js");


module.exports = (config) => {
  if (!config) {
    throw new Error("Missing config");
  }
  // Check for API Key
  if (config.key === undefined) {
    throw new Error("Missing config settings: key");
  }

  const utilities = new utils(config.key);

  return {
    earnings: utilities.createFunc('earnings'),
    timeSeries: utilities.createFunc('timeSeries'),
    apiUsage: utilities.createFunc('apiUsage'),
    stocks: utilities.createFunc('stocks'),
    price: utilities.createFunc('price'),
    earningsCalendar: utilities.createFunc('earningsCalendar')
  };
};
