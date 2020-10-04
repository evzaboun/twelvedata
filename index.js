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
    earnings: utilities.createFunc("earnings", "get"),
    timeSeries: utilities.createFunc("timeSeries", "get"),
    apiUsage: utilities.createFunc("apiUsage", "get"),
    stocks: utilities.createFunc("stocks", "get"),
    price: utilities.createFunc("price", "get"),
    earningsCalendar: utilities.createFunc("earningsCalendar", "get"),
    complexData: utilities.createFunc("complexData", "post"),
  };
};
