"use strict";
require("dotenv").config();
const axios = require("axios");

const axiosClient = axios.create({
  baseURL: "https://api.twelvedata.com",
});

axiosClient.defaults.headers.common[
  "Authorization"
] = `apikey ${process.env.API_KEY}`;
//axiosClient.defaults.headers.post["Content-Type"] = "application/json";

module.exports = axiosClient;
