"use strict";

import requestTypes from "./types.js";

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

  createFunc(endpointName, requestType) 
    return async (params) => {{
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

export default Utilities;
