"use strict";

const axiosClient = require("./axios.js");
const querystring = require("querystring");

class Utilities {
  constructor(key) {
    this.apiKey = {
      apikey: `apikey ${key}`,
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
      if (requestType === "get") {
        return axiosClient
          .get(`${url}?${querystring.stringify({ ...params, ...this.apiKey })}`)
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      } else if (requestType === "post") {
        return axiosClient
          .post(url, params)
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            throw error;
          });
      }
    };
  }
}

module.exports = Utilities;
