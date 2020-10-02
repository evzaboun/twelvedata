"use strict";

const axiosClient = require("./axios.js");
const querystring = require('querystring');

exports.getAvailableEndpoints = () => {
  return {
    earnings: "/earnings",
    timeSeries: "/time_series",
    complexData: "/complex_data",
    stocks: "/stocks",
    price: "/price",
    earningsCalendar: "/earnings_calendar",
    apiUsage: "/api_usage"
  };
};

exports.fetchData = (url, params) => {
  return axiosClient
    .get(`${url}?${querystring.stringify(params)}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

