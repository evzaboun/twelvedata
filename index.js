"use strict";

import utils from "./lib/utilities.js";
import requestTypes from "./lib/types.js";

const twelvedata = (config) => {
  if (!config) {
    throw new Error("Missing config");
  }
  // Check for API Key
  if (config.key === undefined) {
    throw new Error("Missing config settings: key");
  }

  const utilities = new utils(config.key);

  return {
    apiUsage: utilities.createFunc("apiUsage", requestTypes.get),
    complexData: utilities.createFunc("complexData", requestTypes.post),
    cryptocurrencies: utilities.createFunc(
      "cryptocurrencies",
      requestTypes.get
    ),
    cryptocurrencyExchanges: utilities.createFunc(
      "cryptocurrencyExchanges",
      requestTypes.get
    ),
    earliestTimestamp: utilities.createFunc(
      "earliestTimestamp",
      requestTypes.get
    ),
    earnings: utilities.createFunc("earnings", requestTypes.get),
    earningsCalendar: utilities.createFunc(
      "earningsCalendar",
      requestTypes.get
    ),
    etf: utilities.createFunc("etf", requestTypes.get),
    eod: utilities.createFunc("eod", requestTypes.get),
    exchanges: utilities.createFunc("exchanges", requestTypes.get),
    forexPairs: utilities.createFunc("forexPairs", requestTypes.get),
    indices: utilities.createFunc("indices", requestTypes.get),
    price: utilities.createFunc("price", requestTypes.get),
    quote: utilities.createFunc("quote", requestTypes.get),
    stocks: utilities.createFunc("stocks", requestTypes.get),
    symbolSearch: utilities.createFunc("symbolSearch", requestTypes.get),
    technicalIndicators: utilities.createFunc(
      "technicalIndicators",
      requestTypes.get
    ),
    timeSeries: utilities.createFunc("timeSeries", requestTypes.get),
  };
};

export default twelvedata;
