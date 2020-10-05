'use strict';

const axiosClient = require('./axios.js');
const querystring = require('querystring');

class Utilities {
  constructor(key) {
    this.apiKey = {
      apikey: key,
    };
  }

  getAvailableEndpoints() {
    return {
      apiUsage: '/api_usage',
      complexData: '/complex_data',
      cryptocurrencies: '/cryptocurrencies',
      cryptocurrencyExchanges: '/cryptocurrency_exchanges',
      earliestTimestamp: '/earliest_timestamp',
      earnings: '/earnings',
      earningsCalendar: '/earnings_calendar',
      etf: '/etf',
      exchanges: '/exchanges',
      forexPairs: '/forex_pairs',
      indices: '/indices',
      price: '/price',
      quote: '/quote',
      stocks: '/stocks',
      symbolSearch: '/symbol_search',
      technicalIndicators: '/technical_indicators',
      timeSeries: '/time_series'
    };
  }

  createFunc(endpointName, requestType) {
    const url = this.getAvailableEndpoints()[endpointName];

    return (params) => {
        return axiosClient
          .request({
            method: requestType,
            url: `${url}?${querystring.stringify({ ...this.apiKey })}`,
            data: params, // data is sent with post requests only
            params: params // params is set with get requests 
          })
          .then((res) => {
            if (res.status !== 200) {
              throw `A twelve data API error occurred. ${res.status}: ${res.text()}`;
            }
    
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
    }
  }
}

module.exports = Utilities;
