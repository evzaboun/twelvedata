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
  // Base url for the client
  config.base = `https://api.twelvedata.com/`;
  config.availableEndpoints = {
    earnings: "earnings",
    time_series: "time_series",
    complex_data: "complex_data",
    stocks: "stocks",
  };

  return {
    earnings: new Earnings(config),
    timeSeries: new TimeSeries(config),
  };
};
