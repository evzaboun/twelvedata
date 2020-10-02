"use strict";

const axios = require("axios");

const axiosClient = axios.create({
    baseURL: 'https://api.twelvedata.com'
});

module.exports = axiosClient;
