"use strict";

import fetch from "cross-fetch";

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
    let url = this.getAvailableEndpoints()[endpointName];
    return async (params) => {
      if (params) {
        url = url.replace("{indicator}", params.indicator);
      }

      try {
        const res = await fetch(
          `${BASE_URL}${url}?apikey=${this.apiKey.apikey}`,
          {
            method: requestType,
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            data: params,
            params: params,
          }
        );

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
