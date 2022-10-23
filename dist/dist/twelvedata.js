(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.twelvedata = factory());
})(this, (function () { 'use strict';

  const requestTypes = {
    get: "get",
    post: "post",
  };

  let fetch;
  if (typeof window === "undefined") {
    fetch = require("cross-fetch");
  } else {
    fetch = window.fetch;
  }

  const BASE_URL = "https://api.twelvedata.com";

  class Utilities {
    constructor(key) {
      this.apiKey = {
        apikey: key,
      };
    }

    getAvailableEndpoints() {
      return {
        apiUsage: "/api_usage",
        complexData: "/complex_data",
        cryptocurrencies: "/cryptocurrencies",
        cryptocurrencyExchanges: "/cryptocurrency_exchanges",
        earliestTimestamp: "/earliest_timestamp",
        earnings: "/earnings",
        earningsCalendar: "/earnings_calendar",
        etf: "/etf",
        exchanges: "/exchanges",
        forexPairs: "/forex_pairs",
        indices: "/indices",
        price: "/price",
        quote: "/quote",
        stocks: "/stocks",
        symbolSearch: "/symbol_search",
        technicalIndicators: "/{indicator}",
        timeSeries: "/time_series",
      };
    }

    createFunc(endpointName, requestType) {
      return async (params) => {
        let url = this.getAvailableEndpoints()[endpointName];
        if (params) {
          url = url.replace("{indicator}", params.indicator);
        }

        url = `${BASE_URL}${url}?${new URLSearchParams(
        requestType === requestTypes.get
          ? { ...params, ...this.apiKey }
          : this.apiKey
      ).toString()}`;

        let fetchParams = {
          method: requestType,
          cache: "no-cache",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        fetchParams =
          requestType === requestTypes.get
            ? fetchParams
            : {
                ...fetchParams,
                ...{ body: JSON.stringify(params) },
              };

        try {
          const res = await fetch(url, fetchParams);

          if (res.status !== 200) {
            throw `A twelve data API error occurred. ${res.status}`;
          }

          const data = await res.json();

          return data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
    }
  }

  const twelvedata = (config) => {
    if (!config) {
      throw new Error("Missing config");
    }
    // Check for API Key
    if (config.key === undefined) {
      throw new Error("Missing config settings: key");
    }

    const utilities = new Utilities(config.key);

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

  return twelvedata;

}));
