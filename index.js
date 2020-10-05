"use strict";

const utils = require("./lib/utilities.js");

const requestTypes = {
  get: 'get',
  post: 'post'
};

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
    earnings: utilities.createFunc("earnings", requestTypes.get),
    timeSeries: utilities.createFunc("timeSeries", requestTypes.get),
    apiUsage: utilities.createFunc("apiUsage", requestTypes.get),
    stocks: utilities.createFunc("stocks", requestTypes.get),
    price: utilities.createFunc("price", requestTypes.get),
    earningsCalendar: utilities.createFunc("earningsCalendar", requestTypes.get),
    quote: utilities.createFunc('quote', requestTypes.get),
    complexData: utilities.createFunc("complexData", requestTypes.post),
  };
};
