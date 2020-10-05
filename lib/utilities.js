"use strict";

const axiosClient = require("./axios.js");
const querystring = require("querystring");

class Utilities {
  constructor(key) {
    this.apiKey = {
      apikey: key,
    };
  }

  getAvailableEndpoints() {
    return {
      earnings: "/earnings",
      timeSeries: "/time_series",
      complexData: "/complex_data",
      stocks: "/stocks",
      price: "/price",
      earningsCalendar: "/earnings_calendar",
      apiUsage: "/api_usage",
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
