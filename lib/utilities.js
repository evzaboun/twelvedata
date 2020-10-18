"use strict";

const axios = require("axios");
const querystring = require("querystring");

class Utilities {
  constructor(key) {
    this.apiKey = {
      apikey: key,
    };

    axios.defaults.baseURL = "https://api.twelvedata.com";
    axios.defaults.headers.post["Content-Type"] = "application/json";
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
    let url = this.getAvailableEndpoints()[endpointName];
    return (params) => {
      url = url.replace("{indicator}", params.indicator); // create indicator endpoint.

      return axios
        .request({
          method: requestType,
          url: `${url}?${querystring.stringify({ ...this.apiKey })}`,
          data: params, // data is sent with post requests only
          params: params, // params is set with get requests
        })
        .then((res) => {
          if (res.status !== 200) {
            throw `A twelve data API error occurred. ${res.status}`;
          }

          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    };
  }
}

module.exports = Utilities;
