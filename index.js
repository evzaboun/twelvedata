"use strict";

const Earnings = require("./lib/earnings");
const TimeSeries = require("./lib/timeSeries");

module.exports = (config) => {
  if (!config) {
    throw new Error("Missing config");
  }
  // Check for API Key
  if (config.key === undefined) {
    throw new Error("Missing config settings: key");
  }

  return {
    earnings: new Earnings(config),
    timeSeries: new TimeSeries(config),
  };
};
