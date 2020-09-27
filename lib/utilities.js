"use strict";

const axiosClient = require("./axios.js");

exports.getAvailableEndpoints = () => {
  return {
    earnings: "earnings",
    time_series: "time_series",
    complex_data: "complex_data",
    stocks: "stocks",
  };
};

exports.fetchData = (url, params) => {
  return axiosClient
    .get(url, params)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

