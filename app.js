require("dotenv").config();
const config = {
  base: "https://api.twelvedata.com",
  key: process.env.API_KEY,
};

const twelvedata = require("./index.js")(config);
const params = {
  symbol:'AAPL',
  interval:'1min'
};

twelvedata.timeSeries.getData(params).then(data => {
  console.log(data);
});

