require("dotenv").config();
const config = {
  base: "https://api.twelvedata.com/",
  key: process.env.API_KEY,
};

const twelvedata = require("./index.js")(config);
const params = {
  symbol:'AAPL',
  interval:'1min'
};

const data = twelvedata.timeSeries.getData(params);

console.log(data);
